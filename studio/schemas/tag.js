export default {
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    {
      name: "tag",
      title: "Tag Name",
      type: "string",
    },
    {
      name: "tagColor",
      title: "Color",
      type: "color",
      options: {
        disableAlpha: true,
      },
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "tag",
        maxLength: 96,
      },
    },
  ],
};
