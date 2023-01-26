export const GetEC2Instances = async () => {
  const res = await fetch("/api/aws/ec2");
  const json = await res.json();
  return json;
};
