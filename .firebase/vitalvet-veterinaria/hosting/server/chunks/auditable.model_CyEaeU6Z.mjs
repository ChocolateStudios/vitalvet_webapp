class BaseModel {
  id = 0;
}

class AuditableModel extends BaseModel {
  createdAt = /* @__PURE__ */ new Date();
  updatedAt = /* @__PURE__ */ new Date();
}

export { AuditableModel as A };
