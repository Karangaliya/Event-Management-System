import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import whiteLogo from "../../assets/primeevent-high-resolution-logo-black.png"
import blackLogo from "../../assets/primeevent-high-resolution-logo.png"

function Footer() {

    const mode = useSelector((state) => state.theme.mode);


    return (
        <footer className='shadow-xl dark:bg-gray-800 bg-white py-[40px]'>
            <div className='w-[85vw] mx-auto flex flex-col gap-10'>
                <div className="upperPart flex justify-between items-center max-[700px]:flex-col max-[700px]:gap-[40px]">
                    <div className="logo  ">
                        {mode === "dark" ?
                            <Link to="/"><img src={blackLogo} alt="black logo" className='h-[80px]' /></Link> :
                            <Link to="/"><img src={whiteLogo} alt='white logo' className='h-[80px]' /></Link>
                        }
                    </div>
                    <div className="footerData grid grid-cols-3 gap-2">
                        <div className='flex flex-col gap-3'>
                            <h2 className='mb-2 max-[700px]:text-lg max-[700px]:font-bold'>ABOUT</h2>
                            <span><Link to="/about-us" className='hover:underline'>Prime Event</Link></span>   {/* TODO : Change in href and set about page */}
                        </div>
                        <div className='flex flex-col gap-3'>
                            <h2 className='mb-2 max-[700px]:text-lg max-[700px]:font-bold'>FOLLOW US</h2>
                            <span><a href="https://github.com/karangaliya/" target='_blank' className='hover:underline'>Github</a></span>
                            <span><a href="https://discord.com/channels/karangaliya0722" target='_blank' className='hover:underline'>Discord</a></span>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <h2 className='mb-2 max-[700px]:text-lg max-[700px]:font-bold'>LEGAL</h2>
                            <span><a href="#" className='hover:underline'>Privacy Policy</a></span>
                            <span><a href="#" className='hover:underline'>Terms & Conditions</a></span>
                        </div>
                    </div>
                </div>
                <hr className='border-gray-500' />
                <div className="downPart flex justify-between items-center max-[700px]:flex-col max-[700px]:gap-[30px]">
                    <div>&copy; 2024 PrimeEvent. All rights reserved.</div>
                    <div className="icon flex justify-center items-center gap-3">
                        <div>
                            <div className='dark:text-gray-500 dark:hover:text-white'>
                                <a href="https://www.instagram.com/karan_galiya/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="" fill="none">
                                    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                    <path d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M17.5078 6.5L17.4988 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg></a>
                            </div>
                        </div>
                        <div>
                            <div className='dark:text-gray-500 dark:hover:text-white'>
                                <a href="/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="" fill="none">
                                    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                    <path d="M16.9265 8.02637H13.9816C12.9378 8.02637 12.0894 8.86847 12.0817 9.91229L11.9964 21.4268M10.082 14.0017H14.8847" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg></a>
                            </div>
                        </div>
                        <div>
                            <div className='dark:text-gray-500 dark:hover:text-white'>
                                <a href="https://github.com/karangaliya/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="" fill="none">
                                    <path d="M10 20.5675C6.57143 21.7248 3.71429 20.5675 2 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10 22V18.7579C10 18.1596 10.1839 17.6396 10.4804 17.1699C10.6838 16.8476 10.5445 16.3904 10.1771 16.2894C7.13394 15.4528 5 14.1077 5 9.64606C5 8.48611 5.38005 7.39556 6.04811 6.4464C6.21437 6.21018 6.29749 6.09208 6.31748 5.9851C6.33746 5.87813 6.30272 5.73852 6.23322 5.45932C5.95038 4.32292 5.96871 3.11619 6.39322 2.02823C6.39322 2.02823 7.27042 1.74242 9.26698 2.98969C9.72282 3.27447 9.95075 3.41686 10.1515 3.44871C10.3522 3.48056 10.6206 3.41384 11.1573 3.28041C11.8913 3.09795 12.6476 3 13.5 3C14.3524 3 15.1087 3.09795 15.8427 3.28041C16.3794 3.41384 16.6478 3.48056 16.8485 3.44871C17.0493 3.41686 17.2772 3.27447 17.733 2.98969C19.7296 1.74242 20.6068 2.02823 20.6068 2.02823C21.0313 3.11619 21.0496 4.32292 20.7668 5.45932C20.6973 5.73852 20.6625 5.87813 20.6825 5.9851C20.7025 6.09207 20.7856 6.21019 20.9519 6.4464C21.6199 7.39556 22 8.48611 22 9.64606C22 14.1077 19.8661 15.4528 16.8229 16.2894C16.4555 16.3904 16.3162 16.8476 16.5196 17.1699C16.8161 17.6396 17 18.1596 17 18.7579V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg></a>
                            </div>
                        </div>
                        <div>
                            <div className='dark:text-gray-500 dark:hover:text-white'>
                                <a href="/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="" fill="none">
                                    <path d="M3 21L10.5484 13.4516M21 3L13.4516 10.5484M13.4516 10.5484L8 3H3L10.5484 13.4516M13.4516 10.5484L21 21H16L10.5484 13.4516" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer