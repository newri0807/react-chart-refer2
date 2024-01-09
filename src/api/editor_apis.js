import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000", // 백엔드 서버 주소
});

// 데이터 저장
export const saveData = async (data) => {
  return apiClient.post("/posts", data);
};

// 데이터 불러오기
export const loadData = async () => {
  return apiClient.get("/posts");
};

// 데이터 수정
export const updateData = async (id, data) => {
  try {
    return await apiClient.put(`/posts/${id}`, data);
  } catch (error) {
    // 오류 처리
    console.error("Failed to update data:", error);
    throw error; // 오류를 다시 던져서 호출하는 곳에서 처리할 수 있도록 합니다.
  }
};

// 데이터 삭제
export const deleteData = async (id) => {
  return apiClient.delete(`/posts/${id}`);
};
