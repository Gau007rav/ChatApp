import React from 'react'
import { Badge } from '@chakra-ui/react'
function UserBadgeItem({user,handleFunction}) {
  return (
    <>
    <Badge
     px={2}
     py={1}
     borderRadius="lg"
     m={1}
     mb={2}
     variant="solid"
     fontSize={12}
     background="yellow"
     color="purple"
     cursor="pointer"
     onClick={handleFunction}
    >
     {user.name}
    </Badge>
    </>
  )
}

export default UserBadgeItem