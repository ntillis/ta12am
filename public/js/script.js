
const quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            ['blockquote', 'code-block'],
            [{ size: ['small', 'medium', 'large', 'huge'] }],
            [{ color: [] }, { background: [] }],
            ['link', 'image'],
        ]
    },
  });

  document.querySelector('form').addEventListener('submit', function(event) {
    // Set the hidden input value to the Quill editor's content
    document.querySelector('input[name="body"]').value = JSON.stringify(quill.getContents());
  });