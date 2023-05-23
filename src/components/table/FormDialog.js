import {Button, Dialog, DialogActions, DialogContent} from '@mui/material'
import {IconX} from '@tabler/icons-react'

const FormDialog = ({open, handleClose, children, handleSubmit, onSubmit}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogActions>
                <Button onClick={handleClose}><IconX /></Button>
            </DialogActions>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {children}
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default FormDialog