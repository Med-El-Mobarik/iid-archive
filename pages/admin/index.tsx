import Add from "../../components/components/Admin/Add";

import { GetServerSideProps } from "next";

import { getSession } from "next-auth/client";


const index = () => {
  return <Add />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: any = await getSession({ req: context.req });

  if (!session || !session.user.admin) {
    return {
      redirect: {
        destination: "/modules",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default index;
