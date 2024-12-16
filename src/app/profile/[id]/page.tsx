export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 w-screen'>
      <h1 className='text-4xl'>Profile</h1>
      <hr />
      <p className='text-xl flex flex-col justify-center items-center'>
        <span className='p-2 ml-2 rounded bg-orange-500 text-black'>{id}</span>
      </p>
    </div>
  );
}
