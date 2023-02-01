export const WordpressSiteStatus = ({
  wordpressSite,
}: {
  wordpressSite: any;
}) => {
  return (
    <div className="w-full bg-white p-4 flex flex-col justify-center items-center h-64">
      {wordpressSite.active && <div>im ative and good to go</div>}
      {wordpressSite.building && <div>im building look at me go</div>}
    </div>
  );
};
