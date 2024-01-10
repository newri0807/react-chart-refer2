import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";
import "../App.css";
import { deleteData, loadData, saveData, updateData } from "../api/editor_apis";

const EditorContainer = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  max-width: 600px;
`;

const InputWrapper = styled.div`
  margin-bottom: 10px;
`;

const InputLabel = styled.label`
  font-weight: bold;
  margin-right: 10px;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 2;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 10px;
`;

const ListContainer = styled.div`
  margin-top: 20px;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const EditButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const Editor = () => {
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState([]);
  const [flag, setFlag] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // 데이터 불러오기
    const fetchData = async () => {
      try {
        const response = await loadData();
        setSavedData(response.data);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    fetchData();
  }, []);
  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve) => {
          loader.file.then((file) => {
            console.log("2222", file);
            const imageUrl = URL.createObjectURL(file);

            // Append new image to the image array
            setImage((prevImages) => [...prevImages, file]);

            resolve({ default: imageUrl });
          });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  const handleSave = async () => {
    if (isEditMode && selectedData && selectedData.id) {
      // 업데이트 로직
      await handleUpdate();
    } else {
      // 새 데이터 추가 로직
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("writer", author);
        formData.append("content", desc);
        image.forEach((img, index) => formData.append(`image`, img));

        await saveData(formData);
        const response = await loadData();
        setSavedData(response.data);

        // 입력 필드 초기화
        resetInputFields();
      } catch (error) {
        console.error("Failed to save data:", error);
      }
    }

    resetInputFields();
    setIsEditMode(false); // 편집 모드 해제
  };

  const handleEdit = (id) => {
    const selected = savedData.find((data) => data.id === id);
    console.log("🎁", id, savedData, selected);

    if (selected) {
      setTitle(selected.title);
      setAuthor(selected.writer);
      setDesc(updateImageSrc(selected.content, selected.image));
      const imageUrls = selected.image.map((img) => img);
      setImage(imageUrls.length > 0 ? imageUrls : []);

      setSelectedData(selected);
      setIsEditMode(true); // 편집 모드 활성화
    }
  };

  const handleUpdate = async () => {
    if (selectedData && selectedData.id) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("writer", author);
      formData.append("content", desc);
      image.forEach((img, index) => formData.append(`image`, img));

      console.log(
        "total",
        savedData,
        selectedData.id,
        title,
        "수정폼",
        desc,
        image
      );

      try {
        await updateData(selectedData.id, formData); // 이미지를 포함한 formData를 서버로 보냅니다.
        // 성공적으로 업데이트된 후에는, 저장된 데이터를 다시 불러옵니다.
        const response = await loadData();
        setSavedData(response.data);

        // 입력 필드 초기화
        resetInputFields();
      } catch (error) {
        console.error("Failed to update data:", error);
      }
    }
  };

  const resetInputFields = () => {
    setTitle("");
    setAuthor("");
    setDesc("");
    setImage("");
    setSelectedData(null);
    setIsEditMode(false);
  };

  const handleDelete = async (index) => {
    try {
      await deleteData(index);
      // 업데이트된 데이터 불러오기
      const response = await loadData();
      setSavedData(response.data);

      // 입력필드 초기화
      resetInputFields();
    } catch (error) {
      console.error("Failed to delete data:", error);
    }
  };

  function updateImageSrc(content, imageUrls) {
    // Ensure imageUrls is always an array
    if (!Array.isArray(imageUrls)) {
      console.warn("updateImageSrc called without imageUrls array");
      return content; // Return the original content if imageUrls is not an array
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const images = doc.querySelectorAll("img");

    images.forEach((image, index) => {
      const originalSrc = image.getAttribute("src");
      if (originalSrc && originalSrc.startsWith("blob:") && imageUrls[index]) {
        console.log("Replacing src for image:", imageUrls[index]);
        image.setAttribute("src", `${imageUrls[index]}`);
      }
    });

    return doc.body.innerHTML;
  }

  return (
    <EditorContainer>
      <InputWrapper>
        <InputLabel>제목:</InputLabel>
        <TextInput
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>글쓴이:</InputLabel>
        <TextInput
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </InputWrapper>
      <CKEditor
        style={{ height: "300px" }}
        editor={ClassicEditor}
        config={{
          extraPlugins: [uploadPlugin],
        }}
        data={desc}
        onReady={(editor) => {
          //에디터 준비 완료 시 작업 수행
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log("dddd-----------", data);
          setDesc(data);
        }}
        onBlur={(event, editor) => {
          //에디터 포커스가 해제될 때 작업 수행
        }}
        onFocus={(event, editor) => {
          //에디터 포커스를 얻을 때 작업 수행
        }}
      />
      <ButtonWrapper>
        <Button onClick={handleSave}>{isEditMode ? "수정" : "저장"}</Button>
        <Button onClick={() => handleDelete(selectedData.id)}>삭제</Button>
      </ButtonWrapper>
      <ListContainer>
        <h2>저장된 데이터 목록</h2>
        <ul>
          {savedData.map((data, index) => (
            <ListItem key={index}>
              <span>
                {data.title} - {data.writer}
              </span>
              <EditButton onClick={() => handleEdit(data.id)}>편집</EditButton>
              <DeleteButton onClick={() => handleDelete(data.id)}>
                삭제
              </DeleteButton>
            </ListItem>
          ))}
        </ul>
      </ListContainer>
    </EditorContainer>
  );
};

export default Editor;
