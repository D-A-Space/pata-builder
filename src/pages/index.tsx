import { type NextPage } from "next";
import Head from "next/head";
import { SignIn, SignInButton, useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

import Image from "next/image";
const Home: NextPage = () => {
  const user = useUser();
  const { data, isLoading } = api.post.getAll.useQuery();
  if (isLoading) return <div className="">...Loading</div>;
  if (!data) return <div className="">Something went wrong</div>;

  const PostPortal = () => {
    const { user } = useUser();
    console.log(user?.id);
    if (!user)
      return (
        <>
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
          <SignInButton mode="modal">
            <button className="rounded-md bg-green-600 p-3 text-white">
              Sign in
            </button>
          </SignInButton>
        </>
      );
    return (
      <>
        <div className="w-full border border-blue-400">
          <img
            className="h-14 w-14 rounded-full "
            src={user.profileImageUrl}
            alt="user-img"
          />
        </div>
      </>
    );
  };
  return (
    <>
      <Head>
        <title>PATA Builder</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center">
        <div className=" min-h-screen w-full border-2 border-b-0 border-t-0 md:max-w-2xl">
          {/* {!user.isSignedIn ? (
            <>
              <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
              <SignInButton mode="modal">
                <button className="rounded-md bg-green-600 p-3 text-white">
                  Sign in
                </button>
              </SignInButton>
            </>
          ) : (
            <button className="rounded-md bg-red-600 p-3 text-white">
              Sign out
            </button>
          )} */}
          <div className=" h-full max-h-max w-full overflow-y-auto">
            <PostPortal />
            {data.map((post, i) => (
              <div key={i} className=" border-b-2 p-2">
                {post.content}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
