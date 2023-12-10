import { Pagination } from "@mui/material";

export default function Paginations({count, setPages, page}) {
    return (
        <>
            <Pagination count={count} page={page+1} defaultPage={page} onChange={(e, val)=>setPages(val-1)}/>
        </>
    )
}