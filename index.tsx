import React, { useEffect, useState } from 'react';
import Layout from '../../../../components/AppLayout';
import {
    BackLink, MainContainer, MainHeading, TitleDiv,
    MainDiv, SubHeading, InputContainer, SelectContainer,
    ButtonContainer, FirstContainer, ToggleButtonContainer,
    TableDiv, TableContainer, ButtonDiv,
} from './styles';
import "./style.css";
import {
    Box,
    Button, FormControl, FormControlLabel, InputAdornment, InputLabel,
    MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TableCell,
    TextField, ToggleButton, ToggleButtonGroup, Typography,
    styled, useMediaQuery
} from '@mui/material';
import { AiOutlineLeft, AiOutlinePlus } from 'react-icons/ai';
import AlertModal from '../../../../components/AlertModal';
import LoaderModal from '../../../../components/LoaderModal';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectFieldLimitOptions from '../../../../components/SelectFieldLimitOptions';
import SelectFieldDropDown from '../../../../components/SelectFieldDropDown';
import { useFormik } from "formik";
import * as Yup from "yup";
import MuiToggleButton from "@mui/material/ToggleButton";
import { CellProps } from 'react-table';
import { useTable } from 'react-table';
import { GetTokenData } from '../../../../Api/Token';
import { GetBeneficiariesData, PostBenfDeleteData } from '../../../../Api/FundTransfer';
import { GetSavingAccountsData } from '../../../../Api/SavingAccountApi';
import SearchIcon from "@mui/icons-material/Search";
import TableWithPagination from '../../../../components/Table';
import CustomTable from '../../../../components/Table';
import SimpleModal from '../../../../components/SimpleModal';
import { Account } from './types';
import {
    PostTitleFetchData
} from '../../../../Api/ibftTransfer';
import { GetBillersListData, PostBillInquiryData } from '../../../../Api/BillPayment';

export const UtilityBillAcc = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const token = GetTokenData();

    const [transferAccounts, setTransferAccounts] = useState<Account[]>([]);
    const [bankAccounts, setBankAccounts] = useState<Account[]>([]);
    const [updatedTransferAccounts, setUpdatedTransferAccounts] = useState<Account[]>([]);
    const [selectedTransferFrom, setSelectedTransferFrom] = useState("");
    const [selectedBanks, setSelectedBanks] = useState("");
    const [selectedTransferTo, setSelectedTransferTo] = useState("");
    const [utility, setUtility] = useState<Account[]>([]);
    const [selectedUtility, setSelectedUtility] = useState("");
    const [fromNum, setFromNum] = useState("");
    const [savingAccount, setSavingAccount] = useState<Account[]>([]);
    const [beneficiary, setBeneficiary] = useState<Account[]>([]);
    const [selectedTransferFromTitle, setSelectedTransferFromTitle] = useState("");
    const [selectedTransferToTitle, setSelectedTransferToTitle] = useState("");
    const [selectedFromProduct, setSelectedFromProduct] = useState("");
    const [selectedFromBranchCode, setSelectedFromBranchCode] = useState("");
    const [selectedToProduct, setSelectedToProduct] = useState("");
    const [selectedToBranchCode, setSelectedToBranchCode] = useState("");
    const [alertModal, setAlertModal] = useState(false);
    const [utilityName, setUtilityName] = useState("");
    const [utilityValue, setUtilityValue] = useState("");
    const [consumerNum, setConsumerNum] = useState("");
    const [alertBenfModal, setBenfAlertModal] = useState(false);
    const [alertDeleteModal, setDeleteAlertModal] = useState(false);
    const [alertTitleModal, setTitleAlertModal] = useState(false);
    const [alertBillModal, setBillAlertModal] = useState(false);
    const [selectedTransferToIban, setSelectedTransferToIban] = useState("");
    const [selectedTransferFromIban, setSelectedTransferFromIban] = useState("");
    const [search, setSearch] = React.useState("");
    const [alignment, setAlignment] = React.useState("quickPay");
    const [billInquiryData, setBillInquiryData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [inputType, setInputType] = useState("accountNumber");
    const [selectedRowData, setSelectedRowData] = useState<any | null>(null);
    const [bill, setBills] = useState();
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string
    ) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    const {
        isLoading: beneficiaryIsLoading,
        isFetching: beneficiaryFetching,
        isError: beneficiaryErr,
        data: beneficiaryData,
        error: beneficiaryError,
        refetch: refetchbeneficiaryData,
    } = GetBeneficiariesData(token, '3');

    const onBenefClick = () => {
        refetchbeneficiaryData();
    };

    const onQuickPayClick = () => {
        refetchSavingAccount();
    };
    useEffect(() => {
        if (beneficiaryData?.data?.responseCode === "00") {
            console.log("beneficiaryData in dashboard component", beneficiaryData);
            setBeneficiary(beneficiaryData?.data?.data?.beneficiaries);
        } else if (beneficiaryData?.data?.responseCode) {
            // console.log("here we are");
            // setBenfAlertModal(true);
        }
    }, [beneficiaryData]);

    const ToggleButton = styled(MuiToggleButton)({
        "&.Mui-selected, &.Mui-selected:hover": {
            color: "black",
            backgroundColor: "#fff",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.11)",
        },
        padding: "8px 16px",
    });

    const {
        isLoading: savingAccountIsLoading,
        isFetching: savingAccountFetching,
        isError: savingAccError,
        data: savingAccountData,
        error: savingAccountError,
        refetch: refetchSavingAccount,
    } = GetSavingAccountsData(token);

    useEffect(() => {
        refetchSavingAccount();
    }, []);

    useEffect(() => {
        setBenfAlertModal(false);
        if (savingAccountData?.data?.responseCode === "00") {
            console.log("productData in dashboard component", savingAccountData);
            setSavingAccount(savingAccountData?.data?.data?.datawrapper);

            // localStorage.setItem("token expired", JSON.stringify(token));
        } else if (savingAccountData?.data?.responseCode) {
            console.log("here we are");
            setAlertModal(true);
        }
    }, [savingAccountData]);

    useEffect(() => {
        if (
            Array.isArray(savingAccountData?.data?.data?.datawrapper) &&
            savingAccountData?.data?.data?.datawrapper.length > 0
        ) {
            setTransferAccounts(
                savingAccountData?.data?.data?.datawrapper.map((acc: any) => {
                    return {
                        name: `<span class="accountTitle">${acc.accountTitle}</span> - ${acc.accountNumber} - ${acc.branch_code} - <span class="product">${acc.product.split("- ")[1]}</span>`,
                        value: acc.accountTitle + "-" + acc.accountNumber + "-" + acc.branch_code + "-" + acc.product.split("- ")[1],
                    };
                    // return {
                    //     name: acc.accountNumber + "-" + acc.branch_code,
                    //     value: acc.accountNumber + "-" + acc.branch_code,
                    // };
                })
            );
        }
    }, [savingAccountData]);

    const {
        isLoading: BillersListIsLoading,
        isError: BillersListIsError,
        data: BillersListData,
        error: BillersListError,
        refetch: refetchBillersList,
    } = GetBillersListData();

    useEffect(() => {
        refetchBillersList();
    }, []);
    useEffect(() => {
        if (BillersListData?.data?.responseCode === "00") {
            console.log("BillersListData", BillersListData);
        } else if (BillersListData?.data?.responseCode) {
            console.log("here we are bankData");
            setBillAlertModal(true)
        }
    }, [BillersListData]);

    useEffect(() => {
        if (
            Array.isArray(BillersListData?.data?.data) &&
            BillersListData?.data?.data.length > 0
        ) {
            setUtility(
                BillersListData?.data?.data.map((acc: any) => {
                    console.log("BillersListData list", acc);

                    return {
                        name: acc.companyName,
                        value: acc.companyID,
                        icon: acc.billerImage,
                        refImg: acc.billerRefImage,
                    };
                })
            );
        }
    }, [BillersListData]);

    const handleTransferFromChange = (event: any) => {
        const selectedAccountNumber = event;
        setSelectedTransferFrom(selectedAccountNumber);
        removeTransferAccount(selectedAccountNumber);
        const selectedAccount = savingAccount.find((acc: any) => {
            return (
                acc.accountTitle + "-" + acc.accountNumber + "-" + acc.branch_code + "-" + acc.product.split("- ")[1] === selectedAccountNumber
            );
        });
        if (selectedAccount) {
            setSelectedTransferFromTitle(selectedAccount.accountTitle);
            setSelectedFromProduct(selectedAccount.product);
            setSelectedFromBranchCode(selectedAccount.branch_code);
            setSelectedTransferFromIban(selectedAccount.iban);
        }
    };
    const formatAccountNumber = (value: string) => {
        if (!value) return value;

        const onlyNums = value.replace(/[^\d]/g, "");
        if (onlyNums.length <= 4) return onlyNums;

        const branchCode = onlyNums.slice(0, 4);
        const transferTo = onlyNums.slice(4, 15);

        return `${branchCode}${transferTo}`;
    };
    const handleAccountNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedAccountNumber = formatAccountNumber(event.target.value);
        formik.setFieldValue("consumerNo", formattedAccountNumber, true);
    };

    const {
        mutate: BillInquiryMutate,
        isLoading: TitleFetchIsLoading,
        isError: TitleFetchIsError,
        data: BillInquiryData,
        error: TitleFetchError,
    } = PostBillInquiryData();

    useEffect(() => {
        if (BillInquiryData?.data?.responseCode === "00") {
            console.log("BillInquiryData in add account component", BillInquiryData);
            setBillInquiryData(BillInquiryData?.data?.data);
            navigate('/utility-bill-detail', {
                state: {
                    data: BillInquiryData?.data?.data,
                    token: BillInquiryData?.data?.data.token,
                    fromAccountNumber: fromNum,
                    consumerNo: consumerNum,
                    selectedTransferFromTitle: selectedTransferFromTitle,
                },
            });

        } else if (BillInquiryData?.data?.responseCode) {
            setTitleAlertModal(true);
        }
    }, [BillInquiryData]);

    const handleUtilityChange = (event: any) => {
        const selectedUtlityValue = event;
        setSelectedUtility(selectedUtlityValue);
        setUtilityName(getUtilityName(selectedUtlityValue)); // Set the bank name here
    };

    const formik = useFormik({
        initialValues: {
            utility: "",
            consumerNo: "",
            fromAccNo: "",
        },
        validationSchema: Yup.object().shape({
            utility: Yup.string().required("Required*"),
            fromAccNo: Yup.string().required("Required*"),
            consumerNo: Yup.string().required("Required"),
        }),
        onSubmit: (values) => {
            console.log("saba values", values);

            const fromAccountNumber = values.fromAccNo.split('-')[1].trim();
            setFromNum(values.fromAccNo);
            setConsumerNum(values.consumerNo);
            BillInquiryMutate({
                ucid: values.utility,
                companyName: utilityName,
                consumerNo: values.consumerNo,
                fromAccount: fromAccountNumber,
                fromAccountTitle: selectedTransferFromTitle,
                fromIBAN: selectedTransferFromIban,
                token,
            });
        },
    });

    useEffect(() => {
        formik.setFieldValue("fromAccNo", selectedTransferFrom);
    }, [selectedTransferFrom]);

    useEffect(() => {
        formik.setFieldValue("toAccNo", selectedTransferTo);
    }, [selectedTransferTo]);

    const removeTransferAccount = (accountNumber: string) => {
        const updatedTransferAccounts = transferAccounts.filter(
            (account: Account) => account.value !== accountNumber
        );
        setUpdatedTransferAccounts(updatedTransferAccounts);
    };

    const handleTransfer = (rowData: any) => {
        DeleteBenefMutate({
            benefId: rowData.benefID,
            token
        });
    };

    const handleTransferAcc = (rowData: any) => {
        console.log("saba rowData", rowData);
        
        BillInquiryMutate({
            ucid: "KESC0001",
            companyName: "K-Electric",
            consumerNo: "885858588888888",
            fromAccount: "212900100006811",
            fromAccountTitle: "885858588888888",
            fromIBAN: "PK95CDNS0212900100006811",
            
            token,
        });
        // navigate('/utility-bill-detail', {
        //     state: rowData,
        // });
    };

    const {
        mutate: DeleteBenefMutate,
        isLoading: AddBenefIsLoading,
        isError: AddBenefError,
        data: DeleteBenefData,
        error: AddBenefErr,
    } = PostBenfDeleteData();

    useEffect(() => {
        if (DeleteBenefData?.data?.responseCode === "00") {
            console.log("PutBenefData in add account component", DeleteBenefData);
            refetchbeneficiaryData();
        } else if (DeleteBenefData?.data?.responseCode) {
            setDeleteAlertModal(true);
        }
    }, [DeleteBenefData]);

    const handleSubmit = () => {
        navigate('/utility-bill-detail', {
            state: {},
        });
    };
    const handleAddBeneficiary = () => {
        navigate('/add-utility-bill-beneficiary', {
            state: {},
        });
    };

    const isMobile = useMediaQuery("(max-width:720px)");
    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/,/g, '');
        const re = /^[0-9]+$/;
        if (inputValue === "" || re.test(inputValue)) {
            const formattedValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            formik.setFieldValue("amount", formattedValue);
        }
    };
    const onAlertSubmit = () => {
        setAlertModal(false);
        navigate("/dashboard");
    };
    const onBenfAlertSubmit = () => {
        setBenfAlertModal(false);
        navigate("/bill-payment");
    };
    const onDeleteAlertSubmit = () => {
        setDeleteAlertModal(false);
        navigate("/utility-bill-account");
    };
    const onTitleAlertSubmit = () => {
        setTitleAlertModal(false);
        navigate("/utility-bill-account");
    };
    const onBillAlertSubmit = () => {
        setBillAlertModal(false);
        navigate("/bill-payment");
    };
    const columns = [
        { id: 'benefTitle', label: 'Beneficiary Name' },
        { id: 'benefAccount', label: 'Consumer Number' },
        { id: 'benefProductCode', label: 'Status' },
        { id: 'actions', label: 'Action' },
    ];

    const beneficiaryList = beneficiary.map((row) => ({
        ...row,
        actions: (
            <ButtonDiv key={row.id}>
                <Button variant="contained" color="success" onClick={() => handleTransferAcc(row)} style={{ textTransform: "capitalize" }}>
                    Pay
                </Button>
                <Button variant="outlined" color="warning" onClick={() => handleTransfer(row)} style={{ textTransform: "capitalize" }}>
                    Delete
                </Button>
            </ButtonDiv>
        ),
    }));
    const handleEditClick = (row: string) => {
        const selectedRow = beneficiaryList.find((row) => row.benefAccount === row.benefAccount);
        if (selectedRow) {
            setSelectedRowData(selectedRow);
            delete selectedRow.action;
            setSelectedRowData(selectedRow);
            navigate(`/other-benef-bank-detail`, {
                state: {
                    benefAccount: selectedRow.benefAccount,
                    benefAlias: selectedRow.benefAlias,
                    benefBranchCode: selectedRow.benefBranchCode,
                    benefEmail: selectedRow.benefEmail,
                    benefID: selectedRow.benefID,
                    benefIban: selectedRow.benefIban,
                    benefMobile: selectedRow.benefMobile,
                    benefProductCode: selectedRow.benefProductCode,
                    benefTitle: selectedRow.benefTitle,
                    benefType: selectedRow.benefType,
                },
            });
        }
    };

    const handleClose = () => {
        setOpenModal(false);
    };
    useEffect(() => {
        formik.setFieldValue("utility", selectedUtility);
        const selectedUtilitys = utility.find((account) => account.value === selectedUtility);
        if (selectedUtilitys) {
            console.log("selectedUtilitys", selectedUtilitys);
            setUtilityName(selectedUtilitys.name);
            setUtilityValue(selectedUtilitys.value);
        }
    }, [selectedUtility]);

    const getUtilityName = (companyID: any) => {
        const selectedUtilitys = utility.find((utility) => utility.value === companyID);
        return selectedUtilitys ? selectedUtilitys.name : '';
    };
    const utilityOptions = utility.map((utility: any) => ({
        value: utility.name,
        id: utility.value,
        billerImage: utility.icon,
    }));

    return (
        <Layout>
            <SimpleModal open={openModal} onClose={handleClose}>
                <Box padding='0% 10%'>
                    <Typography variant='h2' fontFamily='FontDemiBold' fontSize={18} textAlign={'center'}>
                        This is where you can find your account numbers
                    </Typography>
                    <Box textAlign={'center'} padding={'20px 0px'}>
                        <img
                            src={"assets/images/blurCheque@2x.png"}
                            alt="Account Number"
                            style={{ height: '120px', cursor: "pointer" }}
                        />
                    </Box>
                    <Box textAlign={'center'} marginTop={'-20px'}>
                        <img
                            src={"assets/images/accNumber2.png"}
                            alt="Account Number"
                            style={{ height: '150px', cursor: "pointer" }}
                        />
                    </Box>
                </Box>
            </SimpleModal>
            <LoaderModal open={savingAccountIsLoading || savingAccountFetching} />
            <AlertModal
                open={alertModal}
                responseCode={savingAccountData?.data?.responseCode}
                setSuccessSubmit={onAlertSubmit}
            >
                <Typography textAlign="center" color="#565d64" pt={2}>
                    {savingAccountData?.data?.responseDescription}
                </Typography>
            </AlertModal>
            <AlertModal
                open={alertBenfModal}
                responseCode={beneficiaryData?.data?.responseCode}
                setSuccessSubmit={onBenfAlertSubmit}
            >
                <Typography textAlign="center" color="#565d64" pt={2}>
                    {beneficiaryData?.data?.responseDescription}
                </Typography>
            </AlertModal>
            <AlertModal
                open={alertDeleteModal}
                responseCode={DeleteBenefData?.data?.responseCode}
                setSuccessSubmit={onDeleteAlertSubmit}
            >
                <Typography textAlign="center" color="#565d64" pt={2}>
                    {DeleteBenefData?.data?.responseDescription}
                </Typography>
            </AlertModal>
            <AlertModal
                open={alertTitleModal}
                responseCode={BillInquiryData?.data?.responseCode}
                setSuccessSubmit={onTitleAlertSubmit}
            >
                <Typography textAlign="center" color="#565d64" pt={2}>
                    {BillInquiryData?.data?.responseDescription}
                </Typography>
            </AlertModal>
            <AlertModal
                open={alertBillModal}
                responseCode={BillersListData?.data?.responseCode}
                setSuccessSubmit={onBillAlertSubmit}
            >
                <Typography textAlign="center" color="#565d64" pt={2}>
                    {BillersListData?.data?.responseDescription}
                </Typography>
            </AlertModal>
            <MainHeading>
                <TitleDiv>Utility Bill</TitleDiv>

                <BackLink to="/bill-payment">
                    <MainDiv>
                        {isMobile ? (
                            <React.Fragment>
                                <AiOutlineLeft size={14} color="green" /> Back
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <AiOutlineLeft size={18} color="green" /> Back
                            </React.Fragment>
                        )}
                    </MainDiv>
                </BackLink>
            </MainHeading>
            <FirstContainer>
                <SubHeading>
                    <div></div>
                    {alignment === "Beneficiary" ?
                        <Button
                            sx={{
                                // width: "25%",
                                backgroundColor: "#009951",
                                color: "#fff",
                                marginTop: 1,
                                height: "38px",
                                ":hover": {
                                    backgroundColor: "#0eb466",
                                },
                                textTransform: "capitalize",
                                fontFamily: "FontDemiBold",
                            }}
                            onClick={handleAddBeneficiary}
                            type="submit"
                        >
                            <AiOutlinePlus size={22} />
                            Add Beneficiary

                        </Button> : ''}
                </SubHeading>
                <ToggleButtonContainer>
                    <ToggleButtonGroup
                        color="standard"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                        sx={{ backgroundColor: "lightgray" }}
                    >
                        <ToggleButton
                            value="quickPay"
                            onClick={onQuickPayClick}
                            sx={{
                                textTransform: "capitalize",
                                fontSize: "12px",
                                fontFamily:
                                    alignment === "quickPay" ? "FontDemiBold" : "FontRegular",
                            }}
                        >
                            Quick Pay
                        </ToggleButton>
                        <ToggleButton
                            value="Beneficiary"
                            onClick={onBenefClick}
                            sx={{
                                textTransform: "capitalize",
                                fontSize: "12px",
                                fontFamily:
                                    alignment === "Beneficiary" ? "FontDemiBold" : "FontRegular",
                            }}
                        >
                            Beneficiary
                        </ToggleButton>
                    </ToggleButtonGroup>
                    {alignment === "Beneficiary" ?
                        <TextField
                            id="outlined-start-adornment"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: "#9fa3a6" }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ backgroundColor: "#fff" }}
                            size="small"
                            placeholder="Search"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setSearch(event.target.value);
                            }}
                        /> : ''}
                </ToggleButtonContainer>
            </FirstContainer>
            {alignment === "quickPay" ?
                (
                    <MainContainer onSubmit={formik.handleSubmit}>
                        <InputContainer>
                            <SelectContainer>
                                <FormControl fullWidth >
                                    <InputLabel
                                        id="fromAccNo"
                                        sx={{
                                            fontFamily: "FontRegular",
                                            fontWeight: "normal",
                                            color: "#9ea3a6",
                                        }}
                                    >
                                        Transfer From
                                    </InputLabel>
                                    <Select
                                        label="Transfer From"
                                        value={selectedTransferFrom}
                                        onChange={(event) => handleTransferFromChange(event.target.value)}
                                        required={true}
                                        // error={formik.errors.fromAccNo}
                                        onBlur={formik.handleBlur}
                                        style={{ whiteSpace: "normal" }}
                                        className="custom-select"
                                    >
                                        {transferAccounts.map((acc) => (
                                            <MenuItem
                                                key={acc.value}
                                                value={acc.value}
                                            >
                                                <div>
                                                    <span dangerouslySetInnerHTML={{ __html: acc.name }} />
                                                </div>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {/* <SelectFieldDropDown
                                    id="fromAccNo"
                                    name="fromAccNo"
                                    state={selectedTransferFrom}
                                    label="Transfer From"
                                    options={transferAccounts}
                                    setState={handleTransferFromChange}
                                    required={true}
                                    error={formik.errors.fromAccNo}
                                    touched={formik.touched.fromAccNo}
                                /> */}
                            </SelectContainer>
                            {/* <InputContainer> */}
                            <SelectContainer>
                                {/* <InputLabel id="select-bank-label">Select Bank</InputLabel> */}
                                <Select
                                    labelId="select-utility-label"
                                    id="select-utility"
                                    value={selectedUtility}
                                    placeholder='Select Utility'
                                    onChange={(e) => handleUtilityChange(e.target.value)}
                                    fullWidth
                                    sx={{
                                        '.MuiSelect-select': {
                                            display: 'flex',
                                            alignItems: 'center'
                                        },
                                        '.MuiSelect-select .MuiMenuItem-root': {
                                            display: 'flex',
                                            alignItems: 'center',
                                        },
                                        '.MuiSelect-select .MuiMenuItem-root img': {
                                            width: '30px',
                                            height: '30px',
                                            marginRight: '8px',
                                        }
                                    }}
                                >
                                    {utilityOptions.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {/* <img src={getIconPath(option.smallIcon)} style={{ width: '20px', height: '20px', marginRight: '8px' }} /> */}
                                            <img src={option.billerImage} style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                            {option.value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </SelectContainer>
                            <SelectContainer>
                                <TextField
                                    id="consumerNo"
                                    name="consumerNo"
                                    label="Consumer Number"
                                    variant="outlined"
                                    sx={{ width: "100%", height: 57, }}
                                    value={formik.values.consumerNo}
                                    onChange={handleAccountNumberChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.consumerNo &&
                                        Boolean(formik.errors.consumerNo)
                                    }
                                    helperText={
                                        formik.touched.consumerNo && formik.errors.consumerNo
                                    }
                                />
                            </SelectContainer>
                        </InputContainer>
                        <ButtonContainer>
                            <Button
                                sx={{
                                    width: "40%",
                                    backgroundColor: "#009951",
                                    color: "#fff",
                                    marginTop: 1,
                                    height: "52px",
                                    ":hover": {
                                        backgroundColor: "#0eb466",
                                    },
                                    textTransform: "capitalize",
                                    fontFamily: "FontRegular",
                                }}
                                type="submit"
                            >
                                Continue
                            </Button>
                        </ButtonContainer>
                    </MainContainer>
                ) : (
                    <TableContainer>
                        <TableDiv >
                            <CustomTable
                                columns={columns}
                                data={beneficiaryList || []}
                                showCheckboxes={true}
                                // searchValue={search}
                                onEditClick={handleEditClick}
                                search={search}
                            />
                        </TableDiv>
                    </TableContainer>
                )}
        </Layout >
    )
}

export default UtilityBillAcc;