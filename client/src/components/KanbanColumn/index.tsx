import {Box, Typography} from "@mui/material";
import TaskCart from "../TaskCart";

const styles = {
    main: {
        width: '100%',
        display: 'flex',
        flexFlow: 'column',
    },
    titleCont: {
        width: '100%',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center'
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.54)'
    },
    list: {
        width: '100%',
        height: 'inherit',
        padding: '0.5rem'
    }
}

interface KanbanColumnProps {
    column: {
        name: string,
        items:  Array<{
            title: string,
            description: string,
            assignee: string,
            estimate: number
        }>
    }
}

const KanbanColumn = (props: KanbanColumnProps) => {
    return (
        <Box sx={styles.main}>
            <Box sx={styles.titleCont}>
                <Typography sx={styles.title}>
                    {props.column.name}
                </Typography>
            </Box>
            <Box sx={styles.list}>
                {props.column.items.map(item => {
                    return <TaskCart
                        title={item.title}
                        description={item.description}
                        assignee={item.assignee}
                        estimate={item.estimate} />
                })}
            </Box>
        </Box>
    )
}

export default KanbanColumn;
