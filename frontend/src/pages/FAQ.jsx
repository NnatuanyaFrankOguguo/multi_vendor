import React, {useState} from 'react'
import Header from '../components/Layout/Headers'
import Footer from '../components/Layout/Footer'
import styles from '../styles/styles'
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';


const FAQ = () => {
  return (
    <div>
        <Header activeHeading={5} />
        <Faq />
        <Footer />
    </div>
  )
}


const Faq = () => {

    const [activeTab, setActiveTab] = useState(0)

    const toggleTab = (tab) => {
        if(activeTab === tab) {
            setActiveTab(0)
        } else {
            setActiveTab(tab)
        }
    }

    return (
        <div className={`${styles.section} my-8`}>
            <h2 className='text-3xl font-bold text-gray-900 mb-8'>FAQ</h2>

            <div className='mx-auto space-y-4'>
                {/* single faq 1 */}
                
                <div className='border-b border-gray-200 pb-4'>
                    <button className='flex items-center justify-between w-full' onClick={() => toggleTab(1)}>
                        <span className='text-lg font-medium text-gray-900'>
                            How do I track my order?
                        </span>
                        {
                            activeTab === 1 ? <FiChevronRight size={26} className='text-gray-400' /> : <FiChevronDown size={26} className='text-gray-900' />
                        }
                       
                    </button>
                    {
                            activeTab === 1 && (
                            <div className='mt-4'>
                                <p className='text-base text-gray-500'>
                                    You can track your order by clicking the tracking link in your
                                    shipping confirmation email, or by logging into your account on
                                    our website and viewing the order details.
                                </p>
                            </div> )
                        }


                </div>

                <div className='border-b border-gray-200 pb-4'>
                    <button className='flex items-center justify-between w-full' onClick={() => toggleTab(2)}>
                        <span className='text-lg font-medium text-gray-900'>
                            How do I contact customer support?
                        </span>
                        {
                            activeTab === 2 ? <FiChevronRight size={26} className='text-gray-400' /> : <FiChevronDown size={26} className='text-gray-900' />
                        }
                       
                    </button>
                    {
                            activeTab === 2 && (
                            <div className='mt-4'>
                                <p className='text-base text-gray-500'>
                                You can contact our customer support team by emailing us at
                                support@FrankFort.com, or by calling us at +234 (0)70 700 18654
                                between the hours of 9am and 5pm, Monday through Friday.
                                </p>
                            </div> )
                        }


                </div>

                <div className='border-b border-gray-200 pb-4'>
                    <button className='flex items-center justify-between w-full' onClick={() => toggleTab(3)}>
                        <span className='text-lg font-medium text-gray-900'>
                        Can I change or cancel my order?
                        </span>
                        {
                            activeTab === 3 ? <FiChevronRight size={26} className='text-gray-400' /> : <FiChevronDown size={26} className='text-gray-900' />
                        }
                       
                    </button>
                    {
                            activeTab === 3 && (
                            <div className='mt-4'>
                                <p className='text-base text-gray-500'>
                                    Unfortunately, once an order has been placed, we are not able to
                                    make changes or cancellations(i think i should made changes to this like hotel or not). If you no longer want the items
                                    you've ordered, you can return them for a refund within  24 hours
                                    of delivery.
                                </p>
                            </div> )
                        }


                </div>

                <div className='border-b border-gray-200 pb-4'>
                    <button className='flex items-center justify-between w-full' onClick={() => toggleTab(4)}>
                        <span className='text-lg font-medium text-gray-900'>
                            Do you offer international shipping?
                        </span>
                        {
                            activeTab === 4 ? <FiChevronRight size={26} className='text-gray-400' /> : <FiChevronDown size={26} className='text-gray-900' />
                        }
                       
                    </button>
                    {
                            activeTab === 4 && (
                            <div className='mt-4'>
                                <p className='text-base text-gray-500'>
                                    Currently, we only offer shipping within the Nigeria.
                                </p>
                            </div> )
                        }


                </div>

                <div className='border-b border-gray-200 pb-4'>
                    <button className='flex items-center justify-between w-full' onClick={() => toggleTab(5)}>
                        <span className='text-lg font-medium text-gray-900'>
                            What payment methods do you accept?
                        </span>
                        {
                            activeTab === 5 ? <FiChevronRight size={26} className='text-gray-400' /> : <FiChevronDown size={26} className='text-gray-900' />
                        }
                       
                    </button>
                    {
                            activeTab === 5 && (
                            <div className='mt-4'>
                                <p className='text-base text-gray-500'>
                                    We accept visa,mastercard,paystack payment method also we have
                                    cash on delivery system.
                                </p>
                            </div> )
                        }


                </div>

                <div className='border-b border-gray-200 pb-4'>
                    <button className='flex items-center justify-between w-full' onClick={() => toggleTab(6)}>
                        <span className='text-lg font-medium text-gray-900'>
                            What is your Returns & Refunds policy?
                        </span>
                        {
                            activeTab === 6 ? <FiChevronRight size={26} className='text-gray-400' /> : <FiChevronDown size={26} className='text-gray-900' />
                        }
                       
                    </button>
                    {
                            activeTab === 6 && (
                            <div className='mt-4'>
                                <p className='text-base text-gray-500'>
                                    We strive to ensure customer satisfaction by offering a fair and transparent return and refund policy. Perishable items must be reported within 24 hours 
                                    of delivery with proof of the issue, while non-perishable items can be returned within 7 days if unused and in their original packaging. Refunds can be 
                                    issued as store credit or to your original payment method. For damaged or incorrect products, we provide full refunds or replacements. Please reach out to our support team for assistance, and we'll handle the rest!
                                </p>
                            </div> )
                        }


                </div>

              

            </div>
            



        </div>
    )


}


export default FAQ