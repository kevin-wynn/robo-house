import { MaxWidthContent } from "./MaxWidthContent";

export const DescriptorContent = () => {
  return (
    <MaxWidthContent maxWidth="max-w-screen-lg">
      <div className="flex flex-col">
        <h2 className="text-4xl font-serif text-spice mb-12">
          one place for everything.
        </h2>
        <p className="text-sm leading-8 tracking-widest font-thin">
          from web design and branding, to application development, web hosting,
          marketing site, and any other infrastructure needs you may have. it
          can be done here. why keep track of countless services when you can
          have it all under one roof. giving customers a beautiful admin panel
          to view your products, monitor time tracking spent on tasks and
          projects, see your web hosting status and infrastructure, easily turn
          on and off projects, pause work and change gears to something else. be
          as flexible as you want all under one roof with one easy dashboard.
        </p>
      </div>
    </MaxWidthContent>
  );
};
