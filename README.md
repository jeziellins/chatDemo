# Chat demo using Angular on the frontend and .NET on the backend

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

# Context diagram for Chat System
```mermaid
    C4Context
      Person_Ext(customerA, "User A", "User the Chat")        
      Person_Ext(customerB, "User B", "user the Chat")
      Boundary(b0, "Sistema para Troca de Mensagens") {
        System(SystemA, "Chat", "Chat System")               
      }

      BiRel(customerA, SystemA, "Sen/Received messagens", "HTTP")
      BiRel(customerB, SystemA, "Send/Receive messagens", "HTTP")
      UpdateRelStyle(customerA, SystemA, $offsetY="-40")
      UpdateRelStyle(customerB, SystemA, $offsetY="-40", $offsetX="60")      

      UpdateLayoutConfig($c4ShapeInRow="2", $c4BoundaryInRow="1")
```