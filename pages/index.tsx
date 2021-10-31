import { useState } from "react";
import type { NextPage } from "next";
// import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import classes from "./index.module.scss";
import "animate.css";

import { signIn, SignInResponse } from "next-auth/client";

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";

import TextField from "@mui/material/TextField";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import CircularProgress from "@mui/material/CircularProgress";

interface data {
  cne: string;
  password: string;
}

import Box from "@mui/material/Box";

const Home: NextPage = () => {
  const [spinner, setSpinner] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: data) => {
    setSpinner(true);
    const result: SignInResponse | undefined = await signIn("credentials", {
      redirect: false,
      cne: data.cne,
      password: data.password,
    });
    // setSpinner(false);

    if (result?.error) {
      setSpinner(false);
      alert(result?.error);
    } else {
      router.push("/modules");
    }
  };

  return (
    <div className={classes.container}>
      <form
        className={`${classes.form} animate__animated animate__fadeInDown`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <img className={classes.logo} src="./img/logo.png" alt="logo" />
        <div style={{ marginBottom: "15px", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              marginTop: "15px",
            }}
          >
            <PersonRoundedIcon sx={{ color: "#3498db", mr: 1, my: 0.5 }} />
            <TextField
              autoComplete="off"
              fullWidth
              {...register("cne", { required: true })}
              className={classes.textField}
              label="username"
              variant="standard"
            />
          </Box>
          {errors.cne && (
            <div className={classes.error}>username is required</div>
          )}
        </div>
        <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
          <LockRoundedIcon sx={{ color: "#3498db", mr: 1, my: 0.5 }} />
          <TextField
            fullWidth
            {...register("password", { required: true })}
            type="password"
            className={classes.textField}
            label="password"
            variant="standard"
          />
        </Box>
        {errors.password && (
          <div className={classes.error}>password is required</div>
        )}
        {spinner ? (
          <CircularProgress style={{ marginTop: "35px" }} />
        ) : (
          <button className={classes.button}>Login</button>
        )}
        {/* <button className={classes.button}>Login</button> */}
      </form>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session: Session | null = await getSession({ req: context.req });

//   if (session) {
//     return {
//       redirect: {
//         destination: "/modules",
//         permanent: false,
//       },
//     };
//   } else {
//     return { props: {} };
//   }
// };

export default Home;
