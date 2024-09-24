tinymce.init({
  selector: 'textarea',
  content_css: '/css/main.css',
  height: 600, 
  plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
  relative_urls: false,  // Ensures TinyMCE uses absolute URLs
  remove_script_host: false,  // Includes the host in the URLs
  document_base_url: 'http://localhost:3000/',
  images_upload_url: '/upload-image',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
});