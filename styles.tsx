import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  styled as muiStyled, alpha, FormLabel as MuiFormLabel, TextField,
  Button, OutlinedInputProps, TextFieldProps, Radio as MuiRadio,
  FormHelperText as FormHelper, Button as MuiButton
} from '@mui/material';
export const MainHeading = styled.div`
  font-size: 22px;
  margin:-52px 18px 10px 4px;
  margin-bottom: 2%;
  font-family: FontDemiBold;
  display: flex;
  justify-content: space-between;
`;

export const BackLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
export const StyledRadio = muiStyled(MuiRadio)(({ theme }) => ({
  '&.Mui-checked': {
    color: 'green',
  },
}));
export const TitleDiv = styled.div`
  font-size: 18px;
  font-family: FontDemiBold;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

export const MainDiv = styled.div`
  font-size: 14px;
  display: flex;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

export const FirstContainer = styled.form`
  height: 20vh;
  margin-bottom:2%;
  padding: 3% 5%;
  border-radius: 24px;
  background: #F8F8F8 0% 0% no-repeat padding-box;
      @media screen and (max-width: 768px) {
    }
`;

export const ToggleButtonContainer = styled.div`
   margin: 12px 0px;
   margin-top:16px;
   display:flex;
   justify-content: space-between;
`

export const MainContainer = styled.form`
  height: 52vh;
  padding: 1% 5%;
  border-radius: 24px;
  background: #F8F8F8 0% 0% no-repeat padding-box;
      @media screen and (max-width: 768px) {
    }
`;
export const TableContainer = styled.form`
  height: 48vh;
  padding: 1% 5%;
  border-radius: 24px;
  background: #F8F8F8 0% 0% no-repeat padding-box;
      @media screen and (max-width: 768px) {
    }
`;

export const SubHeading = styled.div`
margin-bottom:2%;
display:flex;
justify-content: space-between;
font-family: FontDemiBold;
`;

export const ButtonDiv = styled.div`
display: flex;
gap: 5%;
`;

export const OwnAccTile = styled.div`
display: flex;
align-items: center;
justify-content:space-between;
width: 55%;
height: 15%;
background: #FFFFFF 0% 0% no-repeat padding-box;
border: 1px solid #DBDBDB;
border-radius: 5px;
margin-top:1%;
opacity: 1;
padding:1% 3%;
`;

export const CDNSAccTile = styled.div`
display: flex;
align-items: center;
justify-content:space-between;
width: 55%;
height: 15%;
background: #FFFFFF 0% 0% no-repeat padding-box;
border: 1px solid #DBDBDB;
border-radius: 5px;
margin-top:1%;
opacity: 1;
padding:1% 3%;
`;
export const SubContainer = styled.div`
height: 100vh;
`;
export const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;
export const SelectContainer = styled.div`
  width: 40%;
  background-color:#fff;
  height: fit-content;
`;
export const SelectRadioContainer = styled.div`
  width: 100%;
  height: fit-content;
`;
export const ButtonContainer = styled.div`
  margin-top: 10px;
  // font-family: ArticulatCF !important;
`;

export const TableDiv = styled.div`
margin: 1em 0em 0em 0em ;
`;

export const TransferButton = styled.button`
  background-color: #ccebdc;
  color: #009951;
  border: none;
  width: 65px;
  font-weight: 600;
  height: 29px;
  padding: 8px 75px 16px 20px;
  border-radius: 16px;
  cursor: pointer;

  &:hover {
    // background-color: #009951;
  }
`;