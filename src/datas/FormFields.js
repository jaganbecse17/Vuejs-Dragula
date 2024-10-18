const static_fields = [
  {
    id: 1,
    displayName: "First Name",
    attribute: {
      type: "text",
      validation: "max:10|min:4|required",
    },
    fieldcode: "first_name",
    isMandatory: "true",
    isVisble: "true",
    authorityCode: "read_write",
  },
  {
    id: 2,
    displayName: "Last Name",
    attribute: {
      type: "text",
    },
    fieldcode: "last_name",
    isMandatory: "false",
    isVisble: "true",
    authorityCode: "read_write",
  },
  {
    id: 3,
    displayName: "E-mail",
    attribute: {
      type: "email",
      validation: "email|required",
    },
    fieldcode: "e_mail",
    isMandatory: "false",
    isVisble: "true",
    authorityCode: "read_write",
  },
  {
    id: 4,
    displayName: "Phone number",
    attribute: {
      type: "ph_number",
      validation: "numeric",
    },
    fieldcode: "p_number",
    isMandatory: "false",
    isVisble: "true",
    authorityCode: "read_write",
  },
  {
    id: 5,
    displayName: "is available?",
    attribute: {
      type: "select",
    },
    fieldcode: "is_available",
    isMandatory: "false",
    isVisble: "true",
    authorityCode: "read_write",
  },
  {
    id: 6,
    displayName: "Remarks",
    attribute: {
      type: "text_area",
    },
    fieldcode: "ava_remark",
    isMandatory: "false",
    isVisble: "true",
    authorityCode: "read_write",
  },
];

export { static_fields };
