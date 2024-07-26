import openai
import fitz  # PyMuPDF
import os

# Initialize OpenAI client with the provided API key
openai.api_key = "sk-proj-wQwtpVBBBRHrNczNqLWVT3BlbkFJPXwpLpm51zEMiDW4eqmv"

# Path to the folder containing the PDFs
pdf_folder_path = r"C:\Users\Harsh Singh\Downloads\Finchat\dataset"

# Function to extract text from all PDFs in the specified folder
def extract_text_from_pdfs(folder_path):
    all_texts = ""
    for filename in os.listdir(folder_path):
        if filename.endswith(".pdf"):
            file_path = os.path.join(folder_path, filename)
            try:
                with open(file_path, "rb") as pdf_file:
                    all_texts += extract_text_from_pdf(pdf_file)
            except Exception as e:
                print(f"Error extracting text from {filename}: {e}")
    return all_texts

# Extract text from all PDFs in the folder
pdf_text = extract_text_from_pdfs(pdf_folder_path)

def extract_text_from_pdf(pdf_file):
    text = ""
    with fitz.open(stream=pdf_file.read(), filetype="pdf") as doc:
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            text += page.get_text()
    return text

def get_response(query):
    messages = [
        {
            "role": "system",
            "content": f"You are a financial chatbot named Finchat. Use the following information to help answer the questions: {pdf_text}"
        },
        {
            "role": "user",
            "content": query,
        }
    ]
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=4000
        )
        return response['choices'][0]['message']['content'].strip()
    except Exception as e:
        print(f"Error getting response from OpenAI: {e}")
        return "An error occurred while processing your query."
