import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {format} from 'date-fns';
import {Rating} from "@mui/lab";

export default function ReviewTable({rows}) {
console.log("ccccc",rows)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>

                        <TableCell >Project Name</TableCell>
                        <TableCell >Date</TableCell>
                        <TableCell >Review</TableCell>
                        <TableCell >Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell >{format(new Date(row.date), "PP")}</TableCell>
                            <TableCell >{row.comment}</TableCell>
                            <TableCell ><Rating name="read-only" value={row.score} readOnly /></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}