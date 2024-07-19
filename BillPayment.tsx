import { useMutation, useQuery } from "react-query";
import config from "../configfile";
import axiosInstance from "./axiosInstance";
import queryClient from "./queryClient";
import { encryptedUrl } from "./EncryptedUrl";

// /api/v1/billpayments/getAllBillersList

const GetBillersList = async () => {
    const headers = {};
    return axiosInstance.get(
        encryptedUrl +
        `/api/v1/billpayments/getAllBillersList?channel=INTERNET_BANKING`,
        { headers }
    );
};

export const GetBillersListData = () => {
    return useQuery(
        "get-billers-list",
        () => GetBillersList(),
        {
            onSuccess: (data) => {
                console.log("get billers list in api", data);
                // queryClient.setQueryData("token", data?.headers["x-auth-next-token"]);
            },
            enabled: false,
            cacheTime: 50,
        }
    );
};


// /api/v1/billpayments/billInquiry

const PostBillInquiry = async (user: {
    ucid: string;
    companyName: string;
    consumerNo: string;
    fromAccount: string;
    fromAccountTitle: string;
    fromIBAN: string;
    token: any;
}) => {
    const headers = { "X-Auth-Token": user.token };
    const payload = {
        ucid: user.ucid,
        companyName: user.companyName,
        consumerNo: user.consumerNo,
        fromAccount: user.fromAccount,
        fromAccountTitle: user.fromAccountTitle,
        fromIBAN: user.fromIBAN,
    };
    console.log("Payload in billInquiry:", payload);

    return axiosInstance.post(
        `${encryptedUrl}` +
        "/api/v1/billpayments/billInquiry?channel=INTERNET_BANKING",
        payload,
        { headers }
    );
};

export const PostBillInquiryData = () => {
    return useMutation(PostBillInquiry, {
        onSuccess: (data) => {
            console.log("post billInquiry in api", data);
            console.log(
                "token billInquiry  headers",
                data?.headers["x-auth-next-token"]
            );
            queryClient.setQueryData("token", data?.headers["x-auth-next-token"]);
            queryClient.setQueryData("billInquiry", data);
        },
    });
};

// /api/v1/billpayments/billPayment

const BillPayment = async (user: {
    financialPin: string;
    fingerPrint: string;
    fpinOrFprint: string;
    TFtoken: string;
    amount: string;
    token: any;
}) => {
    const headers = { "X-Auth-Token": user.token };
    const payload = {
        financialPin: user.financialPin,
        fingerPrint: "",
        fpinOrFprint: "1",
        amount: user.amount,
        token: user.TFtoken,
    };
    console.log("Payload in BillPayment:", payload);

    return axiosInstance.post(
        `${encryptedUrl}` +
        "/api/v1/billpayments/billPayment?channel=INTERNET_BANKING",
        payload,
        { headers }
    );
};

export const BillPaymentData = () => {
    return useMutation(BillPayment, {
        onSuccess: (data) => {
            console.log("post BillPayment  in api", data);
            console.log(
                "token in BillPayment headers",
                data?.headers["x-auth-next-token"]
            );
            queryClient.setQueryData("token", data?.headers["x-auth-next-token"]);
            queryClient.setQueryData("BillPayment", data);
        },
    });
};


//===== POST /api/v1/beneficiary/addBeneficiary======/

// Add Beneficiary
const PostAddBeneficiary = async (user: {
    benefType: string;
    financialPin: string;
    fingerPrint: string;
    fpinOrFprint: string;
    mobileNo: string;
    nickName: string;
    TFtoken: string;
    token: any;
  }) => {
    const headers = { "X-Auth-Token": user.token };
    const payload = {
      financialPin: user.financialPin,
      benefType: user.benefType,
      fingerPrint: user.fingerPrint,
      fpinOrFprint: user.fpinOrFprint,
      mobileNo: user.mobileNo,
      nickName: user.nickName,
      token: user.TFtoken,
    };
    console.log("Payload in AddBeneficiary:", payload);
  
    return axiosInstance.post(
      `${encryptedUrl}` +
      "/api/v1/billpayments/addBeneficiaryBiller?channel=INTERNET_BANKING",
      payload,
      { headers }
    );
  };
  
  export const PostAddBeneficiaryData = () => {
    return useMutation(PostAddBeneficiary, {
      onSuccess: (data) => {
        console.log("post AddBeneficiary title fetch in api", data);
        console.log(
          "token in AddBeneficiary title fetch headers",
          data?.headers["x-auth-next-token"]
        );
        queryClient.setQueryData("token", data?.headers["x-auth-next-token"]);
        queryClient.setQueryData("AddBeneficiary", data);
      },
    });
  };
  