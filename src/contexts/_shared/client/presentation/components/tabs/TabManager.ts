import { tabsStore, closeTab, switchTab, switchSubTab, type MainTab, openTab } from '@/stores/tabs.store';

class TabManager {
    private tabBarEl: HTMLElement | null = null;
    private tabContainerEl: HTMLElement | null = null;
    private unsubscribe: (() => void) | null = null;

    constructor() {
        this.init();
    }

    init() {
        this.tabBarEl = document.getElementById('tab-bar');
        this.tabContainerEl = document.getElementById('tab-container');

        if (!this.tabBarEl || !this.tabContainerEl) {
            console.warn('TabManager: Tab bar or container not found');
            return;
        }

        // Subscribe to store changes
        this.unsubscribe = tabsStore.subscribe(state => {
            this.renderTabBar(state.tabs, state.activeTabId);
            this.renderTabContent(state.tabs, state.activeTabId);
        });
    }

    private renderTabBar(tabs: MainTab[], activeTabId: string | null) {
        if (!this.tabBarEl) return;

        // Clear existing tabs (naive approach, can be optimized with diffing)
        this.tabBarEl.innerHTML = '';

        tabs.forEach(tab => {
            const isActive = tab.id === activeTabId;
            const tabEl = document.createElement('div');
            tabEl.className = `cursor-pointer px-4 py-2 border-b-2 flex items-center gap-2 ${isActive ? 'border-blue-500 text-blue-600 font-semibold' : 'border-transparent text-gray-500 hover:text-gray-700'}`;

            // Title
            const titleSpan = document.createElement('span');
            titleSpan.textContent = tab.title;
            titleSpan.onclick = () => switchTab(tab.id);
            tabEl.appendChild(titleSpan);

            // Close button
            if (tab.isClosable) {
                const closeBtn = document.createElement('button');
                closeBtn.innerHTML = '&times;';
                closeBtn.className = 'ml-2 text-gray-400 hover:text-red-500';
                closeBtn.onclick = (e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                };
                tabEl.appendChild(closeBtn);
            }

            this.tabBarEl?.appendChild(tabEl);
        });
    }

    private async renderTabContent(tabs: MainTab[], activeTabId: string | null) {
        if (!this.tabContainerEl) return;

        // Hide all existing tab contents
        Array.from(this.tabContainerEl.children).forEach((child) => {
            (child as HTMLElement).style.display = 'none';
        });

        if (!activeTabId) return;

        const activeTab = tabs.find(t => t.id === activeTabId);
        if (!activeTab) return;

        // Check if content for this tab already exists
        let contentEl = document.getElementById(`tab-content-${activeTab.id}`);

        if (!contentEl) {
            // Create new content container
            contentEl = document.createElement('div');
            contentEl.id = `tab-content-${activeTab.id}`;
            contentEl.className = 'w-full h-full';
            this.tabContainerEl.appendChild(contentEl);

            // Fetch content
            await this.loadTabContent(activeTab, contentEl);
        }

        // Show active content
        contentEl.style.display = 'block';
    }

    private async loadTabContent(tab: MainTab, container: HTMLElement) {
        const activeSubTab = tab.subTabs.find(st => st.id === tab.activeSubTabId);
        if (!activeSubTab) return;

        // Construct URL
        // Assumption: viewId maps to a route. 
        // For now, let's assume viewId IS the path, e.g., 'pets/all-pets'
        // We append ?partial=true to get only the content
        // Also append params

        // TODO: Map viewId to actual URL. For now, assume viewId is relative path.
        let url = `/app/${activeSubTab.viewId}`;

        const params = new URLSearchParams(activeSubTab.params);
        params.set('partial', 'true');

        const fullUrl = `${url}?${params.toString()}`;

        try {
            container.innerHTML = '<div class="p-4">Loading...</div>';
            const response = await fetch(fullUrl);
            if (!response.ok) throw new Error('Failed to load tab content');

            const html = await response.text();

            // Parse the HTML to extract only the main content
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Try to find the main container with the specific classes
            // or just 'main' tag as a fallback
            const mainContent = doc.querySelector('main.mt-10.md\\:mt-0.md\\:ml-59') || doc.querySelector('main');

            if (mainContent) {
                container.innerHTML = mainContent.innerHTML;
            } else {
                // If no main tag found (maybe it was already a partial without layout), use the body or full html
                // Check if body has content, otherwise use doc.documentElement.innerHTML but that includes head
                // Usually partials might just be the content.
                container.innerHTML = doc.body.innerHTML || html;
            }

            // Re-run scripts if necessary (Astro view transitions might handle this, but manual fetch needs care)
            // For simple HTML partials, this is fine.
        } catch (error) {
            console.error('Error loading tab content:', error);
            container.innerHTML = '<div class="p-4 text-red-500">Error loading content</div>';
        }
    }
}

// Initialize on client load
if (typeof window !== 'undefined') {
    // Expose for global usage
    (window as any).openTab = (title: string, viewId: string, params = {}) => {
        openTab(title, viewId, params);
    };

    // Wait for DOM
    document.addEventListener('DOMContentLoaded', () => {
        new TabManager();
    });

    // Also handle Astro view transitions if used
    document.addEventListener('astro:page-load', () => {
        new TabManager();
    });

    // Global click listener for data-open-tab
    document.addEventListener('click', (e) => {
        const target = (e.target as HTMLElement).closest('[data-open-tab]');
        if (target) {
            e.preventDefault();
            const viewId = target.getAttribute('data-view-id');
            const title = target.getAttribute('data-title') || 'New Tab';
            const paramsStr = target.getAttribute('data-params');
            const params = paramsStr ? JSON.parse(paramsStr) : {};

            if (viewId) {
                openTab(title, viewId, params);
            }
        }
    });
}
