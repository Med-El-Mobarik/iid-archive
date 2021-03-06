import { Fragment, useState } from "react";
import Header from "../../components/layout/Header";
import Years from "../../components/components/Years";
import Modules from "../../components/components/Modules";
import { GetServerSideProps } from "next";

import { getSession } from "next-auth/client";
import { Session } from "next-auth";

import axios from "axios";

interface Props {
  session: any;
  response: [
    {
      semester1: string[];
      semester2: string[];
      year: string;
    }
  ];
}

const years = ["first_year", "second_year", "third_year"];

const Cours = (props: Props) => {
  const { session, response } = props;

  const [year, setYear] = useState(
    years.includes(session?.user?.year) ? session?.user?.year : "first_year"
  );

  return (
    <Fragment>
      <Header name={session?.user?.name} />
      <Years year={year} setYear={setYear} />
      <Modules response={response} year={year} />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: Session | null = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
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

  if (!response) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session, response },
  };
};

export default Cours;
