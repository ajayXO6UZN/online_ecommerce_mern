import React from 'react';
import Modal from '../../../components/UI/Modal/Modal';
import { Box, Button, TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DropdownTreeSelect from "react-dropdown-tree-select";
import 'react-dropdown-tree-select/dist/styles.css'
import data from '../demo-data.json'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';



const useStyles = makeStyles((theme) => ({

    inputSize: {
        width: '100%',
        marginBottom: '15px',
        marginRight: '15px'
    },
    input: {
        display: 'none',
    },
    PublishIcon: {
        marginRight: '15px'
    },
    PublishBtn: {
        marginTop: '15px'
    },
    control: {
        // width: '100%',
        margin: '0 9px 0 9px'
    },
    selectControl: {
        margin: "-10px 0 0 0",
        width: '119px'
    },
    widthCon: {
        width: '138px'
    }
}));



const UpdateCategory = (props) => {

    const classes = useStyles();

    const {
        open,
        handleClose,
        handleTitle,
        size,
        allCategories,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        setSelectRole,
        categoryType
    } = props;

   

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    return (
        <>
            <Modal
                open={open}
                handleClose={handleClose}
                handleTitle={handleTitle}
                size={size}
            >
                <h5>Expanded Categories</h5>
                {
                    expandedArray.length > 0 &&
                    expandedArray.map((item, index) =>
                        <Box display="flex" key={index}>
                            <TextField id="outlined-basic" size='small' className={classes.widthCon}
                                label={item.label}
                                variant="outlined"
                                onChange={(e) => handleCategoryInput('label', e.target.value, index, 'expanded')}
                            />
                            <DropdownTreeSelect texts={{ placeholder: 'Select Category' }} onChange={(currentNode, selectedNodes) => handleCategoryInput('parentId', currentNode.value, index, 'expanded')} className={classes.control} data={allCategories} keepTreeOnSearch />
                            <FormControl className={classes.selectControl}>
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={item.type}
                                    onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}
                                >
                                    <MenuItem value='store'>Store</MenuItem>
                                    <MenuItem value='page'>Page</MenuItem>
                                    <MenuItem value='product'>Product</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    )
                }
                <h5>Checked Categories</h5>
                {
                    checkedArray.length > 0 &&
                    checkedArray.map((item, index) =>
             
                        <Box display="flex" key={index}>
                            <TextField id="outlined-basic" size='small' className={classes.widthCon}
                                label={item.label}
                                variant="outlined"
                                onChange={(e) => handleCategoryInput('label', e.target.value, index, 'checked')}
                            />
                            <DropdownTreeSelect className={classes.control} onChange={(currentNode, selectedNodes) => handleCategoryInput('parentId', currentNode.value, index, 'checked')} texts={{ placeholder: 'Select Category' }} data={allCategories} keepTreeOnSearch />
                            <FormControl className={classes.selectControl}>
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={item.type}
                                    onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
                                >
                                    <MenuItem value='store'>Store</MenuItem>
                                    <MenuItem value='page'>Page</MenuItem>
                                    <MenuItem value='product'>Product</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    )
                }
            </Modal>

        </>
    );
}

export default UpdateCategory