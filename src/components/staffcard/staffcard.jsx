import { Avatar, Card, CardContent, Typography } from "@mui/material";

export default function StaffCard({image, name, designation}){
    return(
        <Card style={{backgroundColor: '#252525'}}>
            <CardContent sx={{textAlign: 'center'}}>
                <Avatar 
                    alt={name}
                    src={image}
                    sx={{width: {xs:'6rem',sm:'12rem'}, height: {xs:'6rem',sm:'12rem'}, margin: 'auto'}}
                />
                <Typography variant="h6" sx={{color: 'white'}}>
                    {name}
                </Typography>
                <Typography variant="p" sx={{color: 'whitesmoke'}}>
                    {designation}
                </Typography>
            </CardContent>
        </Card>
    )
}
