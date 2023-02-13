import React, {useState} from "react";
import {Box} from "@mui/material";
import KanbanColumn from "../../../../components/KanbanColumn";
import setTaskColorState from "../../../../utils";

const styles = {
    display: 'flex',
    justifyContent: 'space-between',
    border: '1.5px solid #1976d2',
    height: 'calc(100vh - 120px)',
    borderRadius: '10px'
}

const MainBoard = () => {
    const [columns, setColumns] = useState([
        {
            name: 'new',
            items: [
                {
                    title: 'Task1',
                    description: 'firstOne',
                    assignee: 'Me',
                    estimate: 3
                }
            ],
        },
        {
            name: 'in progress',
            items: [],
        },
        {
            name: 'resolved',
            items: [],
        },
    ])

    console.log(setTaskColorState(2))

    return (
      <Box sx={styles}>
          {columns.map(item => {
              return <KanbanColumn key={item.name} column={item} />
          })}
      </Box>
  )
}

export default MainBoard
