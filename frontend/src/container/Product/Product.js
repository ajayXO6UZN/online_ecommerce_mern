import React, { useState, useEffect, Fragment } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    TablePagination,
    TableFooter,
    IconButton,
} from '@material-ui/core';
import Layout from '../../components/Layout/Layout';
import { Box, Button, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import AddProduct from './components/AddProduct/AddProduct';
import useStyles from './style';
import { createProduct, getAdminProducts, updateProduct, deleteProduct, createBulkProduct, clearErrors } from '../../actions/productAction';
import { generatePublicUrl } from '../../urlConfig';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useAlert } from "react-alert";
import PublishIcon from '@material-ui/icons/Publish';
import Loader from '../Loader/Loader';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';


function Product() {
    const alert = useAlert();

    const classes = useStyles();
    const dispatch = useDispatch();

    const category = useSelector(state => state.allCategoryList);
    
    var { products, loading, error } = useSelector((state) => state.products);
  
    var { loading, success, error } = useSelector((state) => state.product);
   
    const { user } = useSelector((state) => state.user);


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [open, setOpen] = React.useState(false);
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [productRow, setProductRow] = React.useState(false);

    const [categoryName, setCategory] = useState('');

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const [bulkCsv, setBulkCsvFile] = useState([]);


    const [productId, setProductId] = useState('');
    const [productTitle, setProductTitle] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productStock, setProductStock] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productComparePrice, setProductComparePrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [productStatus, setProductStatus] = useState('');
   
    const [productDeals, setProductDeals] = useState('');


    useEffect(() => {
        dispatch(getAdminProducts())
    }, [])

    useEffect(() => {
        if (error) {
            alert.error(error);
             dispatch(clearErrors());
        }

        if (success) {
            alert.success("Product Updated Successfully");

              dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, alert, error, success]);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleUpdateClickOpen = (row) => {
        console.log(row)
        setProductRow(row);
        setProductTitle(row.name);
        setProductBrand(row.brand);
        setProductStock(row.Stock);
        setProductPrice(row.price);
        setCategory(row.category);
        setProductComparePrice(row.comparePrice);
        setProductDescription(row.description);
        setProductStatus(row.status);
        setProductDeals(row.deal_type)
        //  setSelectedFiles(row.productPictures)
        setEditModalOpen(true);
    };

    const simpleHandleClose = () => {
        setEditModalOpen(false);
        setOpen(false)
    }

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.label,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return myCategories;
    }


    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setBulkCsvFile(files);
        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };


    const handleEditClose = () => {
        // console.log(productId)
        const form = new FormData();
        form.append('_id', productId);
        form.append('name', productTitle);
        form.append('brand', productBrand);
        form.append('price', productComparePrice);
        form.append('comparePrice', productPrice);
        form.append('description', productDescription);
        form.append('Stock', productStock);
        form.append('category', categoryName);
        form.append('status', productStatus);
        form.append('deal_type', productDeals);

        images.forEach((image) => {
            form.append("images", image);
        });

        dispatch(updateProduct(form));

        setCategory('');
        //  setProductImage('');
        setEditModalOpen(false);
    };

    const handleCsvBulkData = () => {
        // console.log(productId)
        const form = new FormData();
        for (let pic of bulkCsv) {
            form.append('csvBulkData', pic);
        }


        dispatch(createBulkProduct(form));

    };
console.log(productDeals)
    //console.log(product && product.brand)
    const handleClose = () => {
        const form = new FormData();
        form.append('name', productTitle);
        form.append('brand', productBrand);
        form.append('price', productComparePrice);
        form.append('comparePrice', productPrice);
        form.append('description', productDescription);
        form.append('Stock', productStock);
        form.append('category', categoryName);
        form.append('deal_type', productDeals);
        images.forEach((image) => {
            form.append("images", image);
        });

        dispatch(createProduct(form));
        setCategory('');
        //  setProductImage('');
        setOpen(false);
    };



    const categoryList = renderCategories(category.categories);
    return (
        <>

            <Layout>
                <Box display="flex" p={1} flexWrap='wrap'>
                    <Box p={1} flexGrow={1} >
                        <Typography variant="h4" component="div">categories</Typography>
                    </Box>
                    <div className={classes.productBtn}>
                        <input
                            // accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={handleImageChange}
                        />

                        <label htmlFor="contained-button-file">
                            <Button variant="outlined" className={classes.PublishBtn} color="primary" component="span">
                                <PublishIcon className={classes.PublishIcon} />
                                Bulk Products
                            </Button>
                        </label>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleCsvBulkData}
                            className={classes.button}
                        // startIcon={<AddCircleIcon />}
                        >Submit</Button>
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleClickOpen}
                        className={classes.button}
                        startIcon={<AddCircleIcon />}
                    >
                        Add
                    </Button>


                </Box>
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <TableContainer component={Paper} className={classes.s_table} >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.tableHeaderCell}>Product Info</TableCell>
                                        <TableCell className={classes.tableHeaderCell}>Thumbnail</TableCell>
                                        <TableCell className={classes.tableHeaderCell}>Category</TableCell>
                                        <TableCell className={classes.tableHeaderCell}>Price</TableCell>
                                        <TableCell className={classes.tableHeaderCell}>Stock</TableCell>
                                        <TableCell className={classes.tableHeaderCell}>Description</TableCell>
                                        <TableCell className={classes.tableHeaderCell}>Status</TableCell>
                                        {user && user.role === 'contributor' ? '' :
                                            <TableCell className={classes.tableHeaderCell}>Actions</TableCell>
                                        }

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products && products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell>

                                                <Grid container>
                                                    <Grid item lg={2}>
                                                        <Avatar alt={row.brand} src='.' className={classes.avatar} />
                                                    </Grid>
                                                    <Grid item lg={10}>
                                                        <Typography className={classes.name}>{row.brand}</Typography>
                                                        <Typography color="textSecondary" variant="body2">{row.name}</Typography>
                                                        <Typography color="textSecondary" variant="body2">{row._id}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell>
                                                <Box className={classes.imgStyle}>
                                                    {row.images && row.images[0] &&
                                                        <img className={classes.innerImage} src={row.images[0].url} />
                                                    }
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="body2">{row.category}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="body2">{row.price}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="body2">{row.Stock}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="body2">{row.description}</Typography>
                                            </TableCell>

                                            {/* <TableCell>{row.joinDate}</TableCell> */}
                                            <TableCell>
                                                <Typography
                                                    className={classes.status}
                                                    style={{
                                                        backgroundColor:
                                                            ((row.status === 'Active' && 'green') ||
                                                                (row.status === 'Pending' && 'red'))
                                                    }}
                                                >{row.status}</Typography>
                                            </TableCell>
                                            {user && user.role === 'contributor' ? '' :
                                                <TableCell >
                                                    <div style={{ display: 'flex' }}>
                                                        <IconButton aria-label="edit" onClick={() => handleUpdateClickOpen(row)} className={classes.margin}>
                                                            <EditIcon fontSize="medium" />
                                                        </IconButton>
                                                        <IconButton aria-label="delete" onClick={() => {
                                                            const payload = {
                                                                productId: row._id,
                                                            };
                                                            dispatch(deleteProduct(payload));
                                                        }} className={classes.margin}>
                                                            <DeleteIcon fontSize="medium" />
                                                        </IconButton>
                                                    </div>
                                                </TableCell>
                                            }

                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 15]}
                                        // component="div"
                                        count={products && products.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </Fragment>
                )}
                <AddProduct
                    open={open}
                    handleClose={handleClose}
                    simpleHandleClose={simpleHandleClose}
                    handleTitle={'Add New Product'}
                    //size='true'
                    allCategories={categoryList}
                    productTitle={productTitle}
                    productBrand={productBrand}
                    productStock={productStock}
                    productPrice={productPrice}
                    productComparePrice={productComparePrice}
                    productDescription={productDescription}
                    setProductTitle={setProductTitle}
                    setProductBrand={setProductBrand}
                    setProductStock={setProductStock}
                    setProductPrice={setProductPrice}
                    setProductComparePrice={setProductComparePrice}
                    setProductDescription={setProductDescription}
                    handleImageChange={handleImageChange}
                    selectedFiles={imagesPreview}
                    setCategory={setCategory}
                    productDeals={productDeals}
                    setProductDeals={setProductDeals}
                />

                <AddProduct
                    open={editModalOpen}
                    handleClose={handleEditClose}
                    simpleHandleClose={simpleHandleClose}
                    handleTitle={'Update Product'}
                    //size='true'
                    allCategories={categoryList}
                    productTitle={productTitle}
                    productBrand={productBrand}
                    productStock={productStock}
                    productPrice={productPrice}
                    productComparePrice={productComparePrice}
                    productDescription={productDescription}
                    setProductTitle={setProductTitle}
                    setProductBrand={setProductBrand}
                    setProductStock={setProductStock}
                    setProductPrice={setProductPrice}
                    setProductComparePrice={setProductComparePrice}
                    setProductDescription={setProductDescription}
                    handleImageChange={handleImageChange}
                    selectedFiles={imagesPreview}
                    setCategory={setCategory}
                    productRow={productRow}
                    setProductId={setProductId}
                    productStatus={productStatus}
                    setProductStatus={setProductStatus}
                    productDeals={productDeals}
                    productDeals={productDeals}
                    setProductDeals={setProductDeals}
                />

            </Layout>
        </>
    );
}

export default Product;





























