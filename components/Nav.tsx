import MobileNav from './MobileNav'
import NavBar from './Navbar'

import { useMediaQuery } from '@chakra-ui/react';

export default function Nav() {
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')
    return (
        <>
            {isLargerThan800 ? <NavBar /> : <MobileNav />}
        </>
    );
}