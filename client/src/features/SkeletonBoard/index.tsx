import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Box } from '@mui/material'

const SkeletonBoard = (): ReactJSXElement => {
  return (
      <Box display="flex" >
          <Stack display="flex" alignItems="center" margin='4rem' spacing={3} width="100%">
              <Skeleton variant="rounded" width="14vw" height="18vh" />
              <Skeleton variant="rounded" width="14vw" height="18vh" />
              <Skeleton variant="rounded" width="14vw" height="18vh" />
          </Stack>
          <Stack display="flex" alignItems="center" margin='4rem' spacing={3} width="100%">
              <Skeleton variant="rounded" width="14vw" height="18vh" />
              <Skeleton variant="rounded" width="14vw" height="18vh" />
              <Skeleton variant="rounded" width="14vw" height="18vh" />
          </Stack>
          <Stack display="flex" alignItems="center" margin='4rem' spacing={3} width="100%">
              <Skeleton variant="rounded" width="14vw" height="18vh" />
              <Skeleton variant="rounded" width="14vw" height="18vh" />
              <Skeleton variant="rounded" width="14vw" height="18vh" />
          </Stack>
          <Stack display="flex" alignItems="center" margin='4rem' spacing={3} width="100%">
              <Skeleton variant="rounded" width="14vw" height="18vh" />
              <Skeleton variant="rounded" width="14vw" height="18vh" />
              <Skeleton variant="rounded" width="14vw" height="18vh" />
          </Stack>
      </Box>

  )
}

export default SkeletonBoard
