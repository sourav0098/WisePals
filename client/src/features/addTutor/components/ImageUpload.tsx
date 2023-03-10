import {
  Avatar,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface FileWithPreview extends File {
  preview: string;
}

type Props = {
  onAcceptedFiles: (acceptedFiles: FileWithPath[]) => void;
};

function ImageUpload(props: Props) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const maxFiles = 1;
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/*": [".png", ".jpeg", ".jpg"],
      },
      maxFiles,
      onDrop: (acceptedFiles: FileWithPath[]) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        props.onAcceptedFiles(acceptedFiles);
      },
    });

  const thumbs = files.map((file, index) => (
    <Avatar
      key={index}
      alt={file.preview}
      src={file.preview}
      sx={{ width: 156, height: 156, borderRadius: "2%" }}
      onLoad={() => {
        URL.revokeObjectURL(file.preview);
      }}
    />
  ));

  return (
    <Card
      sx={{ width: "100%", backgroundColor: "#f1f8fc", m: 0 }}
      variant="outlined"
    >
      <CardContent>
        <Box
          {...getRootProps()}
          sx={{
            border: 1,
            borderRadius: 1,
            borderColor: "rgba(0, 0, 0, 0.23)",
            paddingY: 3,
            paddingX: 1,
            "&:hover": {
              borderColor: "text.primary",
            },
            "&:focus-within": {
              borderColor: "primary.main",
              borderWidth: 2,
            },
          }}
        >
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input {...getInputProps()} />
            <CloudUploadIcon sx={{ fontSize: 40 }} color="primary" />
            <Typography
              variant="h6"
              textAlign="center"
              color="text.primary"
              sx={{ paddingY: 1 }}
            >
              Upload Profile Image
            </Typography>
            <Typography
              variant="caption"
              textAlign="center"
              color="text.primary"
              sx={{ paddingY: 1 }}
            >
              Drag and drop an image, select a image
            </Typography>

            <FormHelperText error={true}>
              {fileRejections[0]?.errors[0]?.message.includes("bytes")
                ? "File is larger than 600 KB"
                : fileRejections[0]?.errors[0]?.message}
            </FormHelperText>
          </FormControl>
        </Box>
        <Box
          component="ul"
          sx={{
            display: "flex",
            justifyContent: "left",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            pt: 2,
            m: 0,
          }}
        >
          {thumbs}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ImageUpload;
