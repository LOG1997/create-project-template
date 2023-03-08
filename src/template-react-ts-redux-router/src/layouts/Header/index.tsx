import React, { useRef } from 'react'
import { navList } from './navList'
import { Navbar, Container, Nav } from 'react-bootstrap'
import SvgIcon from '@/components/SvgIcon'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import { useScroll } from 'ahooks';
export default function Header() {
    const navigate = useNavigate()
    const ref = useRef(null);
    const scroll = useScroll(ref);
    return (
        <div className="h-full w-1200px">
            <Navbar collapseOnSelect expand="md" className='header-container m-0 p-0'>
                <Container fluid className="header-container h-full flex justify-between">
                    <Navbar.Brand href="#" className="header-left h-14 flex items-center pl-10">
                        <div className="header-logo-container w-30 h-16 flex items-center">
                            <div className='h-14'>
                                <SvgIcon name="react" iconStyle={{ color: "linear-gradient(to right, rgba(0,0,0), rgba(255,255,255))", width: "50px", height: "50px" }} />
                            </div>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className="header-nav-container me-auto">
                        <Nav className="me-auto">
                            {
                                navList.map((item, index) => {
                                    return (
                                        <Nav.Link key={index} onClick={() => { navigate(item.path) }} className='header-nav-item font-bold font-mono text-lg px-3 cursor-pointer'>{item.name}</Nav.Link>
                                    )
                                })
                            }
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse id="navbarScroll" className="header-nav-container me-auto text-right">
                        <Nav className='w-full'>
                            <Nav.Link className='header-nav-item font-bold font-mono text-lg px-3 w-full cursor-pointer'>登录</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
