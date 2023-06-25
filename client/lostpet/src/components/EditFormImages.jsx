import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import classes from "./EditFormImages.module.css";

const EditFormImages = ({image, onImageDeleteSelect}) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        onImageDeleteSelect(image.filename, isChecked)
    }, [isChecked, image.filename, onImageDeleteSelect])

    const handleCheckBox = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            <Box sx={{ width: '250px'}}>
                <img className={classes.deleteImage} src={image.path} alt={image.filename} />
                <div className={classes.checkBoxContainer}>
                    <FormControlLabel sx={{margin: '0 auto'}} control={<Checkbox onChange={handleCheckBox} />} label="Delete Image?"/>
                </div>
            </Box>
        </>
    )
};

export default EditFormImages;