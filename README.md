# Chat demo using Angular on the frontend and .NET on the backend

This project aims to present a solution for real-time communication using a chat system.

[![Watch the video](https://img.youtube.com/vi/fkwB5MFFPZg/default.jpg)](https://youtu.be/fkwB5MFFPZg)

## Technologies Used:
- .NET 8
- ASP.NET Core
- Angular 16
- PostgreSQL
- Dapper
- SignalR

# Diagrams
## Sequence Diagram

```mermaid
sequenceDiagram
    participant user1
    participant frontend as Frontend (Angular)
    participant backend as Backend (.NET)
    participant user2

    user1->>frontend: Send message
    frontend->>backend: Send message to store
    backend-->>frontend: Storage confirmation
    frontend-->>user1: Message sent
    backend->>frontend: Notify new message for user2
    frontend-->>user2: Display new message

    user2->>frontend: Send reply
    frontend->>backend: Send reply to store
    backend-->>frontend: Storage confirmation
    frontend-->>user2: Message sent
    backend->>frontend: Notify new message for user1
    frontend-->>user1: Display new message
```
## Context diagram
```mermaid
    C4Context
      Person_Ext(customerA, "User A", "User the Chat")        
      Person_Ext(customerB, "User B", "user the Chat")
      Boundary(b0, "Sistema para Troca de Mensagens") {
        System(SystemA, "Chat", "Chat System")               
      }

      BiRel(customerA, SystemA, "Send/Receive messagens", "HTTP")
      BiRel(customerB, SystemA, "Send/Receive messagens", "HTTP")
      UpdateRelStyle(customerA, SystemA, $offsetY="-40")
      UpdateRelStyle(customerB, SystemA, $offsetY="-40", $offsetX="60")      

      UpdateLayoutConfig($c4ShapeInRow="2", $c4BoundaryInRow="1")
```
## Container diagram
```mermaid
    C4Container
      Person_Ext(customerA, "User A", "User the Chat")        
      Person_Ext(customerB, "User B", "User the Chat")

      Container_Boundary(c1, "Chat - Frontend") {
        Container(spa, "Single-Page App", "TypeScript, Angular", "Frontend")        
      }
      Container_Boundary(c2, "Chat - Backend") {
        Container(web_app, "WebAPI REST", ".NET, c#, ASP.NET Core", "Backend")
        ContainerDb(database, "Database", "PostgreSQL", "Stores user and messages")
      }

      BiRel(customerA, spa, "User Interface")
      BiRel(customerB, spa, "User Interface")
      BiRel(spa, web_app, "Send/Receive", "HTTP/WebSocket")
      Rel(web_app, database, "Dapper")
      UpdateRelStyle(customerA, spa, $offsetY="-40", $offsetX="-90")
      UpdateRelStyle(customerB, spa, $offsetY="-40", $offsetX="60")   
      UpdateRelStyle(spa, web_app, $offsetY="-35", $offsetX="-40")

      UpdateLayoutConfig($c4ShapeInRow="2", $c4BoundaryInRow="3")
```