# GWTool

GWTool is a sleek, modern web application providing various online tools for users. The application includes multiple functional pages and provides an excellent user experience across multiple platforms.

## Techniques

- **React.js**: The entire frontend is built using React.
- **Node.js**: Backend based on CloudFlare's Worker (nodeJS)
- **Material-UI**: The application is styled using Material-UI components, ensuring a polished and responsive design.
- **Cloud Infrastructure**: Structured CloudFlare's solution of relational database D1 and object storage R2 integrated with AWS SDK.
- **SSO Implementation**: Seamlessly integrated SSO with central authentication center to give user permissions (through Cookie with JWT) to access authenticated resources.
- **JWT Authentication**: The app integrates JWT-based authentication within Cookie. Upon successful login, the username is displayed in the UI, and users have access to additional features like file management and resource browsing.
- **Responsive Layouts**: CSS and Material-UI's responsive breakpoints are utilized to ensure the layout adjusts fluidly to various screen sizes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.