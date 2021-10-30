import Del from '../../components/components/Admin/Delete';

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";

import axios from "axios";

interface Props {
  response: [
    {
      semester1: string[];
      semester2: string[];
      year: string;
    }
  ];
}

const Delete = (props: Props) => {
  const { response } = props;

  return <Del response={response} />;
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

  const getModules = async () => {
    try {
      const res = await axios.get(`${process.env.url}/api/modules`, {
        withCredentials: true,
        headers: {
          Cookie: context.req.headers.cookie!,
        },
      });
      return res.data;
    } catch (error: any) {
      if (error.response) {
        // console.log("s3");
        console.log(error.response.data);
      }
      console.log("s2");
      console.log(error.message);
      return null;
    }
  };
  const response = await getModules();

  return {
    props: { response },
  };
};

export default Delete;
