import React, { useState, useCallback } from 'react';
import Layout from '../../components/Layout/Layout';
import './style.css';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { IoIosArrowDropup, IoIosPeople } from "react-icons/io";
import { FaShoppingBasket, FaShoppingCart } from "react-icons/fa";
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
    PieChart, Pie, Sector, Cell
} from "recharts";
import { format, parseISO, subDays } from "date-fns";
import { BsFillStarFill } from "react-icons/bs";
import bag from '../../assets/img/bag.jpeg'
import { useSelector, useDispatch } from "react-redux";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


const data = [];
for (let num = 30; num >= 0; num--) {
    data.push({
        date: subDays(new Date(), num).toISOString().substr(0, 10),
        value: 100,
    });
}

const Tip = ({ setShowTooltip, ...rest }) => {
    const [payload, setPayload] = React.useState(rest.payload);


    // When the payload has data (area hovered in the chart), add it to the state
    // so we can use it to show and hide the tooltip at our expense
    React.useEffect(() => {
        rest.payload.length && setPayload(rest.payload);
    }, [rest.payload]);

    return payload.length ? (
        <div
            // Tooltip hides when leaving the tooltip itself
            onMouseLeave={() => setShowTooltip(false)}
            // Prevent Rechart events while the mouse is over the tooltip
            onMouseMove={e => e.stopPropagation()}
            style={{
                background: "white",
                padding: "2em",
                borderRadius: "4px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
            }}
        >
            {`${payload[0].name}: ${payload[0].value}`}
    
        </div>
    ) : null;
};


function CustomTooltip({ active, payload, label }) {
    if (active) {
        return (
            <div className="tooltip">
                <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
                <p>${payload[0].value.toFixed(2)} CAD</p>
            </div>
        );
    }
    return null;
}
function Dashboard() {
    const [showTooltip, setShowTooltip] = React.useState(false);
    const { products } = useSelector((state) => state.products);

    const { orders } = useSelector((state) => state.allOrders);

    const { users } = useSelector((state) => state.allUsers);

    let productSold = 0;
    let productNotSold = 0;
    let failed = 0;
    orders &&
        orders.forEach((item) => {
            if (item.orderStatus == "failed") {
                failed += 1
            }

            if (item.orderStatus == "delivered") {
                productSold += 1
            }else{
                productNotSold += 1
            }
        });


        const piedata = [
            { name: "In Stock", value: products.length - productSold },
            { name: "Out of Stock", value: productSold },
           
        ];

    
    console.log(productSold)
    return (
        <>
            <Layout>
                <div className='dashboard'>
                    <div className='dash_heading'>
                        Admin Dashboard
                    </div>
                    <div className='dash_card'>
                        <div className='card_1'>
                            <div className='card_main'>
                                <h3 className='h3_card'>
                                    {products.length}
                                    <i className='i_arrow'><IoIosArrowDropup /></i>

                                </h3>
                                <p className='card_p'>Total Products</p>
                                <i className='i_cart'><AddShoppingCartIcon /></i>
                            </div>
                        </div>
                        <div className='card_1'>
                            <div className='card_main'>
                                <h3 className='h3_card'>
                                    {productSold && productSold}
                                    <i style={{ color: '#42a5f6' }} className='i_arrow'><IoIosArrowDropup /></i>

                                </h3>
                                <p className='card_p'>Product Solds</p>
                                <i style={{ background: '#42a5f6' }} className='i_cart'><FaShoppingBasket /></i>
                            </div>
                        </div>
                        <div className='card_1'>
                            <div className='card_main'>
                                <h3 className='h3_card'>
                                    {orders && orders.length}
                                    <i style={{ color: '#7ed320' }} className='i_arrow'><IoIosArrowDropup /></i>

                                </h3>
                                <p className='card_p'>Total Orders</p>
                                <i style={{ background: '#7ed320' }} className='i_cart'><FaShoppingCart /></i>
                            </div>
                        </div>
                        <div className='card_1'>
                            <div className='card_main'>
                                <h3 className='h3_card'>
                                    {users && users.length}
                                    <i style={{ color: '#f75d81' }} className='i_arrow'><IoIosArrowDropup /></i>

                                </h3>
                                <p className='card_p'>Total Customers</p>
                                <i style={{ background: '#f75d81' }} className='i_cart'><IoIosPeople /></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='chart'>
                    <div className='chart_1'>
                        <div className='chart_header'>
                            <h5 className='chart_h5'>All Sales & Stock Statistics</h5>
                            <span className='span_clip'>Chart</span>
                        </div>
                        <ResponsiveContainer width="100%" height={400}>
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                                        <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
                                    </linearGradient>
                                </defs>

                                <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />

                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(str) => {
                                        const date = parseISO(str);
                                        if (date.getDate() % 7 === 0) {
                                            return format(date, "MMM, d");
                                        }
                                        return "";
                                    }}
                                />

                                <YAxis
                                    datakey="value"
                                    axisLine={false}
                                    tickLine={false}
                                    tickCount={8}
                                    tickFormatter={(number) => `$${number.toFixed(2)}`}
                                />

                                <Tooltip content={<CustomTooltip />} />

                                <CartesianGrid opacity={0.1} vertical={false} />
                            </AreaChart>
                        </ResponsiveContainer>

                    </div>
                </div>

                <div className='chart'>
                    <div className='chart_1'>
                        <div className='chart_header'>
                            <h5 className='chart_h5'>Order  Status</h5>
                            <span className='span_clip'>Chart</span>

                        </div>
                        <p>Overview of orders</p>
                        <div>
                            <div>
                                <h3 className='h3___'>Success</h3>
                                <div class="w3-light-grey">
                                    <div class="w3-container w3-green w3-center" style={{ width: `${productSold*100 / (orders && orders.length)}%` }}>{productSold*100 / (orders && orders.length)}%</div>
                                </div>
                            </div><br />

                            <div>
                                <h3 className='h3___'>Processing</h3>
                                <div class="w3-light-grey">
                                    <div class="w3-container w3-red w3-center" style={{ width: `${productNotSold*100 / (orders && orders.length)}%` }}>{productNotSold*100 / (orders && orders.length)}%</div>
                                </div><br />
                            </div>

                            <div>
                                <h3 className='h3___'>Failed</h3>
                                <div class="w3-light-grey">
                                    <div class="w3-container w3-blue" style={{ width: `${failed*100 / (orders && orders.length)}%` }}>{failed*100 / (orders && orders.length)}%</div>
                                </div>

                            </div><br />
                        </div>
                        <div className='total_num'>
                            <div className='foot_1'>
                                <span className='span_'>{productSold}</span>
                                <p className='p_'>Success</p>
                            </div>
                            <div className='foot_1'>
                                <span className='span_'>{productNotSold}</span>
                                <p className='p_'>Processing</p>
                            </div>
                            <div className='foot_1'>
                                <span className='span_'>{failed}</span>
                                <p className='p_'>Failed</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ position: 'relative', height: '400px', width: '40%', flex: '0 0 50%' }} className='chart'>
                        <div className='chart_1'>
                            <div className='chart_header'>
                                <h5 className='chart_h5'>Order  Status</h5>
                                <span className='span_clip'>Pie Chart</span>

                            </div>
                            <p>Stock</p>
                            <div style={{ position: 'absolute', top: '0px' }}>
                                <PieChart width={400} height={400} onMouseLeave={() => setShowTooltip(false)}>
                                    <Pie
                                        onMouseEnter={() => setShowTooltip(true)}
                                        data={piedata}
                                        cx={200}
                                        cy={200}
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={150}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    {showTooltip && (
                                        <Tooltip
                                            // Anymation is a bit weird when the tooltip shows up after hidding
                                            isAnimationActive={false}
                                            // Send props down to get the payload
                                            content={<Tip setShowTooltip={setShowTooltip} />}
                                            // We need this to manage visibility ourselves
                                            wrapperStyle={{ visibility: "visible", pointerEvents: "auto" }}
                                        />
                                    )}
                                </PieChart>
                            </div>

                        </div>
                    </div>


                    <div style={{ height: '400px', width: '40%', flex: '0 0 50%' }} className='chart'>
                        <div className='chart_1' style={{ height: '400px' }}>
                            <div className='chart_header'>
                                <h5 className='chart_h5'>Top Rated Products</h5>
                                <span className='span_clip'>Top rated</span>
                            </div>

                            <ul className='ul_dash'>
                                <li className='li_dash'>
                                    <a classNmae='' href='#'><img className='dash_img' src={bag}></img></a>
                                    <a className='dash_head' href='#'>Apple iPhone XR</a>
                                    <p className='dash_p'>There are many variations of passages...
                                    </p>
                                    <div style={{ lineHeight: '0' }}>
                                        <span className='icon_star'><BsFillStarFill /> </span>
                                        <span className='icon_star'><BsFillStarFill /> </span>
                                        <span className='icon_star'><BsFillStarFill /> </span>
                                        <span className='icon_star'> <BsFillStarFill /> </span>
                                        <span className='icon_star'><BsFillStarFill /> </span>

                                    </div>
                                </li>
                                <li className='li_dash'>
                                    <a classNmae='' href='#'><img className='dash_img' src={bag}></img></a>
                                    <a className='dash_head' href='#'>Apple iPhone XR</a>
                                    <p className='dash_p'>There are many variations of passages...
                                    </p>
                                    <div style={{ lineHeight: '0' }}>
                                        <span className='icon_star'><BsFillStarFill /> </span>
                                        <span className='icon_star'><BsFillStarFill /> </span>
                                        <span className='icon_star'><BsFillStarFill /> </span>
                                        <span className='icon_star'> <BsFillStarFill /> </span>
                                        <span className='icon_star'><BsFillStarFill /> </span>

                                    </div>
                                </li>
                                <li className='li_dash'>
                                    <a classNmae='' href='#'><img className='dash_img' src={bag}></img></a>
                                    <a className='dash_head' href='#'>Apple iPhone XR</a>
                                    <p className='dash_p'>There are many variations of passages...
                                    </p>
                                    <div style={{ lineHeight: '0' }}>
                                        <span className='icon_star'><BsFillStarFill /> </span>
                                        <span className='icon_star'><BsFillStarFill /> </span>
                                        <span className='icon_star'><BsFillStarFill /> </span>
                                        <span className='icon_star'> <BsFillStarFill /> </span>
                                        <span className='icon_star'><BsFillStarFill /> </span>

                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    );
}

export default Dashboard;