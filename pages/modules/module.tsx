// import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Header from "../../components/layout/Header";
import Content from "../../components/components/Content";

import { getSession } from "next-auth/client";
import { Session } from "next-auth";

import axios from "axios";

interface Props {
  params: {
    year: string;
    semester: string;
    name: string;
  };
  session: Session;
  response: {
    cours: string[];
    tds: string[];
    exams: string[];
  };
}

const Module = (props: Props) => {
  const { session, params, response } = props;
  const { cours, tds, exams } = response;

  // console.log(response);
  return (
    <>
      <Header name={session?.user?.name} />
      <Content module={params.name} cours={cours} tds={tds} exams={exams} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const years = ["first_year", "second_year", "third_year"];
  const semesters = ["semester_one", "semester_two"];
  const params: any = context.query;
  const session: Session | null = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!params.name) {
    return {
      redirect: {
        destination: "/modules",
        permanent: false,
      },
    };
  }

  const getStructure = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/structure/${params.name}`,
        {
          withCredentials: true,
          headers: {
            Cookie: context.req.headers.cookie!,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      if (error.response) {
        console.log("s3");
        console.log(error.response.data);
      }
      // console.log("s2");
      // console.log(error.message);
      return null;
    }
  };
  const response = await getStructure();

  if (!response) {
    return {
      redirect: {
        destination: "/modules",
        permanent: false,
      },
    };
  }

  return {
    props: { session, params, response },
  };
};

export default Module;
