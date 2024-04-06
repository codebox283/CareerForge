import docx
from pdfminer.high_level import extract_text

def parse_resume(file_path):
    if file_path.endswith('.pdf'):
        text = extract_text(file_path)
    elif file_path.endswith('.docx'):
        doc = docx.Document(file_path)
        text = '\n'.join([paragraph.text for paragraph in doc.paragraphs])
    else:
        raise ValueError("Unsupported file format. Only PDF and DOCX files are supported.")

    # Perform resume parsing logic here
    # For demonstration, let's just return the extracted text
    return text
