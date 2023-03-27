import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

interface TeamTableProps {
  teamList: {
    email: string
    userName: string
    map: any
  }
}

const TeamTable = (props: TeamTableProps): ReactJSXElement => {
  const { teamList } = props

  return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>UserName</TableCell>
                        <TableCell align="right">Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teamList.map((row: {
                      email: string
                      userName: string
                    }) => (
                        <TableRow
                            key={row.userName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.userName}
                            </TableCell>
                            <TableCell align="right">
                                {row.email}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
  )
}

export default TeamTable
