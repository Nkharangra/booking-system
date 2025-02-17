import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { getLearner, getUser } from "@/lib/actions/learner.actions";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const User = await getUser(userId);
  const learner = await getLearner(userId);

  if (learner) redirect(`/learner/${userId}/new-appointment`);

  return (
    <>
      <div>User Id is {userId}</div>
      {/* Check if User exists and then display its properties */}

      {/* <div>
        <p>Name: {User.name}</p>
        <p>Email: {User.email}</p>
      </div> */}
    </>

    // <div className="flex h-screen max-h-screen">
    //   <section className="remove-scrollbar container">
    //     <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
    //       <Image
    //         src="/assets/icons/logo-full.svg"
    //         height={1000}
    //         width={1000}
    //         alt="patient"
    //         className="mb-12 h-10 w-fit"
    //       />

    //       <RegisterForm userId={userId} />

    //       <p className="copyright py-12">© 2024 CarePluse</p>
    //     </div>
    //   </section>

    //   <Image
    //     src="/assets/images/register-img.png"
    //     height={1000}
    //     width={1000}
    //     alt="patient"
    //     className="side-img max-w-[390px]"
    //   />
    // </div>
  );
};

export default Register;
