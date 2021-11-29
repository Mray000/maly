export const ConvertImage = (uri) => {
  let file_name = uri
    .split("")
    .reverse()
    .join("")
    .split("/")[0]
    .split("")
    .reverse()
    .join("");
  return {
    name: file_name,
    uri: uri, //  file:///data/user/0/com.cookingrn/cache/rn_image_picker_lib_temp_5f6898ee-a8d4-48c9-b265-142efb11ec3f.jpg
    type: "image/" + file_name.split(".")[1], // video/mp4 for videos..or image/png etc...
  };
};
