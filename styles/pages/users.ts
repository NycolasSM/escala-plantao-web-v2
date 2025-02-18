import styled from "styled-components";
import { TableContainer, TableCell, TableHead, TableRow, TextField, Dialog } from "@mui/material";

export const StyledTableContainer = styled(TableContainer)`
  margin: 10px;
  max-width: 99%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  min-width: 92vw !important;

  th {
    cursor: pointer;
  }
`;

export const StyledTableCell = styled(TableCell)`
  padding: 5px 10px !important;
  font-size: 12px !important;
  color: #333 !important;
`;

export const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: #f4f4f4 !important;
  }
`;

export const ActionsCell = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1px solid #dddddd;
  gap: 8px; // Reduced gap to fit compact design
  padding-right: 15px;

  > button {
    border: solid 1px #dddddd;
  }
`;

export const StyledDialog = styled(Dialog)`
  & .MuiDialog-container {
    & .MuiPaper-root {
      padding: 20px;
    }
  }
`;

export const StyledTextField = styled(TextField)`
  margin: 8px 0;
  background-color: white;
  font-size: 13px !important;
  padding: 0px !important;
`;

export const StyledTableHead = styled(TableHead)`
  background-color: #377081;
  height: 40px;

  span {
    font-size: 13px;
    font-weight: 500 !important;
    color: white;
  }
`;

export const StyledTableHeaderCell = styled(StyledTableCell)`
  font-weight: bold;
  background-color: #d0d0d0;
`;

export const WideCell = styled(StyledTableCell)`
  width: 25%; // Adjusted for Address
`;

export const MediumCell = styled(StyledTableCell)`
  width: 15%; // Other medium information
`;

export const NarrowCell = styled(StyledTableCell)`
  width: 8%; // Narrower for ID and similar
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 500px;
  padding-top: 10px;
`;

export const SearchUser = styled.div`
  background-color: white;

  * {
    font-size: 14px !important;
  }
`