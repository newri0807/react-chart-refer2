// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { Editor } from "react-draft-wysiwyg";
// import {
//   EditorState,
//   convertToRaw,
//   ContentState,
//   convertFromHTML,
// } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftjsToHtml from "draftjs-to-html";

// const Container = styled.div`
//   width: 100%;
// `;

// const RowBox = styled.div`
//   width: 100%;
//   display: flex;
// `;

// const Viewer = styled.div`
//   width: calc(50% - 40px);
//   height: 400px;
//   padding: 20px;
//   margin-top: 20px;
//   border: 2px solid gray;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   margin-top: 20px;
// `;

// const Input = styled.input`
//   margin-bottom: 10px;
//   padding: 5px;
//   border: 1px solid lightgray;
// `;

// // 커스텀 이미지 컴포넌트
// const CustomImage = (props) => {
//   const { contentState, entityKey } = props;
//   const entity = contentState.getEntity(entityKey);
//   const data = entity.getData();
//   return <img src={data.src} alt="이미지" />;
// };

// const Draft = () => {
//   const [editorState, setEditorState] = useState(
//     EditorState.createWithContent(
//       ContentState.createFromText("") // 빈 문자열로 초기화
//     )
//   );

//   const [htmlString, setHtmlString] = useState("");
//   const [author, setAuthor] = useState("");
//   const [title, setTitle] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [selectedPostIndex, setSelectedPostIndex] = useState(null);

//   useEffect(() => {
//     if (selectedPost !== null) {
//       // 수정 모드일 때, 선택한 게시물의 내용을 에디터에 설정
//       setEditorState(
//         EditorState.createWithContent(
//           ContentState.createFromBlockArray(
//             convertFromHTML(selectedPost.content)
//           )
//         )
//       );
//     } else {
//       // 새 게시물 작성 모드일 때, 에디터를 초기화
//       setEditorState(EditorState.createEmpty());
//     }
//   }, [selectedPost]);

//   const updateTextDescription = (state) => {
//     const html = draftjsToHtml(convertToRaw(state.getCurrentContent()));
//     setEditorState(state);
//     setHtmlString(html);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (selectedPost === null) {
//       // 새 게시물 생성
//       const newPost = {
//         author,
//         title,
//         content: htmlString,
//       };

//       // 이전 게시물 목록에 새 게시물 추가
//       setPosts([...posts, newPost]);
//     } else {
//       // 선택한 게시물 수정
//       const updatedPost = {
//         ...selectedPost,
//         author,
//         title,
//         content: htmlString,
//       };

//       // 기존 게시물 목록 업데이트
//       const updatedPosts = [...posts];
//       updatedPosts[selectedPostIndex] = updatedPost;

//       setPosts(updatedPosts);
//       setSelectedPost(null); // 수정 모드에서 나가기
//     }

//     // 입력 필드 초기화
//     setAuthor("");
//     setTitle("");
//     setEditorState(EditorState.createEmpty());
//     setHtmlString("");
//   };

//   const handleEdit = (index) => {
//     // 수정할 게시물 선택
//     const selectedPost = posts[index];
//     setSelectedPost(selectedPost);
//     setSelectedPostIndex(index);

//     // 선택한 게시물의 정보를 폼에 설정
//     setAuthor(selectedPost.author);
//     setTitle(selectedPost.title);
//     setEditorState(
//       EditorState.createWithContent(
//         ContentState.createFromBlockArray(convertFromHTML(selectedPost.content))
//       )
//     );
//     setHtmlString(selectedPost.content);
//   };

//   const handleDelete = (index) => {
//     // 선택한 인덱스의 게시물 삭제
//     const updatedPosts = [...posts];
//     updatedPosts.splice(index, 1);
//     setPosts(updatedPosts);
//   };

//   const uploadCallback = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         resolve({ data: { link: reader.result } });
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };
//   return (
//     <>
//       <div>draft</div>
//       <Container>
//         <Editor
//           placeholder="게시글을 작성해주세요"
//           editorState={editorState}
//           onEditorStateChange={updateTextDescription}
//           toolbar={{
//             image: { uploadCallback: uploadCallback }, // 이미지 업로드 콜백 함수 사용
//           }}
//           localization={{ locale: "ko" }}
//           editorStyle={{
//             height: "400px",
//             width: "100%",
//             border: "3px solid lightgray",
//             padding: "20px",
//           }}
//           customBlockRendererFn={(contentBlock) => {
//             const type = contentBlock.getType();
//             if (type === "atomic") {
//               return {
//                 component: CustomImage,
//                 editable: false,
//                 props: {},
//               };
//             }
//             return null;
//           }}
//         />
//       </Container>
//       <Form onSubmit={handleSubmit}>
//         <Input
//           type="text"
//           placeholder="작성자"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//           required
//         />
//         <Input
//           type="text"
//           placeholder="글 제목"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <button type="submit">
//           {selectedPost === null ? "게시물 저장" : "게시물 수정"}
//         </button>
//       </Form>
//       <RowBox>
//         {posts.map((post, index) => (
//           <Viewer key={index}>
//             <h2>{post.title}</h2>
//             <p>작성자: {post.author}</p>
//             <div dangerouslySetInnerHTML={{ __html: post.content }} />
//             <button onClick={() => handleEdit(index)}>수정</button>
//             <button onClick={() => handleDelete(index)}>삭제</button>
//           </Viewer>
//         ))}
//       </RowBox>
//     </>
//   );
// };

// export default Draft;
