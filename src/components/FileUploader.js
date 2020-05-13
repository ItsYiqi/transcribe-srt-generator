import React from 'react'

import { Auth, Storage } from 'aws-amplify';
import { Button } from '@material-ui/core';

import { useSnackbar } from 'notistack';

function FileUploader(props) {
    const [uploading, setUploading] = React.useState(false);
    const { userid, onComplete } = props;
    const { enqueueSnackbar } = useSnackbar();

    const uploadFile = async (file) => {

        const fileName = file.name
        const user = await Auth.currentAuthenticatedUser();

        const result =
            await Storage.put(
                fileName,
                file,
                {
                    customPrefix: { public: 'uploads/' + userid + '/' },
                    metadata: { tag: '', owner: user.username }
                }
            );
        console.log('Uploaded file: ', result);
    }

    const onChange = async (e) => {
        setUploading(true);

        let files = [];
        for (var i = 0; i < e.target.files.length; i++) {
            files.push(e.target.files.item(i));
        }
        await Promise.all(files.map(f => uploadFile(f)));
        if (onComplete) {
            enqueueSnackbar('Your file has been uploaded', { variant: 'success' });
            onComplete();
        }
        setUploading(false);
    }

    return (
        <div>
            <label htmlFor="upload-file-input">
                <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    disabled={uploading}
                >
                    {uploading ? 'Uploading...' : 'Upload audio'}
                </Button>
            </label>

            <input
                id='upload-file-input'
                type="file"
                accept='audio/*'
                multiple
                onChange={onChange}
                style={{ display: 'none' }}
            />
        </div>
    );
}
export default FileUploader;