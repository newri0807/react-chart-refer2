import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";
import "../App.css";

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
  const [image, setImage] = useState("");
  const [flag, setFlag] = useState(false);

  const [savedData, setSavedData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("savedData");
    if (storedData) {
      setSavedData(JSON.parse(storedData));
    }
  }, []);

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve) => {
          loader.file.then((file) => {
            // 이미지를 업로드하고 이미지 URL을 생성합니다.
            const imageUrl = URL.createObjectURL(file);

            if (!flag) {
              setFlag(true);
              setImage(imageUrl);
            }

            // 이미지 URL을 받아온 후 로컬 스토리지에 저장합니다.
            const editorData = JSON.stringify({
              title,
              author,
              desc,
              image: imageUrl,
            });
            localStorage.setItem("editorData", editorData);

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

  const handleSave = () => {
    // 입력된 데이터를 저장하고 로컬 스토리지에 저장된 데이터 배열에 추가합니다.
    const newData = { title, author, desc, image };
    const updatedData = [...savedData, newData];
    setSavedData(updatedData);
    localStorage.setItem("savedData", JSON.stringify(updatedData));

    // 입력된 데이터를 초기화합니다.
    setTitle("");
    setAuthor("");
    setDesc("");
    setImage("");
  };

  const handleEdit = (index) => {
    // 선택한 데이터를 편집 모드로 설정하고 상태에 저장합니다.
    const selected = savedData[index];
    setSelectedData(selected);
    setTitle(selected.title);
    setAuthor(selected.author);
    setDesc(selected.desc);
    setImage(selected.image);
  };

  const handleDelete = (index) => {
    // 선택한 데이터를 삭제하고 로컬 스토리지에서도 제거합니다.
    const updatedData = [...savedData];
    updatedData.splice(index, 1);
    setSavedData(updatedData);
    localStorage.setItem("savedData", JSON.stringify(updatedData));

    // 선택한 데이터를 초기화합니다.
    setSelectedData(null);
    setTitle("");
    setAuthor("");
    setDesc("");
    setImage("");
  };

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
        <Button onClick={handleSave}>저장</Button>
        <Button onClick={() => handleDelete(savedData.indexOf(selectedData))}>
          삭제
        </Button>
      </ButtonWrapper>
      <ListContainer>
        <h2>저장된 데이터 목록</h2>
        <ul>
          {savedData.map((data, index) => (
            <ListItem key={index}>
              <span>
                {data.title} - {data.author}
              </span>
              <EditButton onClick={() => handleEdit(index)}>편집</EditButton>
              <DeleteButton onClick={() => handleDelete(index)}>
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
