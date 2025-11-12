# Implementation Plan

- [x] 1. Create type definitions and data models
  - Create TypeScript interfaces for NamespaceConfig, KubernetesQuotas, and ArchitectureReview in src/types/index.ts
  - Add validation helper types for form state management
  - _Requirements: 1.1, 2.1, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [x] 2. Create sample namespace data JSON file
  - Create public/data/namespaces.json with 2-3 sample namespace configurations
  - Include all required fields with realistic sample data
  - Ensure JSON structure matches TypeScript interfaces
  - _Requirements: 2.2, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [x] 3. Implement ProtectedRoute component
  - Create src/components/ProtectedRoute.tsx component
  - Integrate with useAuth hook to check authentication status
  - Implement redirect logic for unauthenticated users
  - Add loading state display during authentication check
  - Style loading state consistent with existing app patterns
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 4. Implement form validation utilities
  - Create src/utils/namespaceValidation.ts
  - Implement validation functions for required fields (applicationName, namespaceName, namespaceDescription, namespaceAccessAdGroup, awsIamRole)
  - Add numeric field validation for quota counts (services, pods, persistentVolumeClaims must be positive integers)
  - Implement conditional validation for architecture review explanations (required when approved is false)
  - Create error message generation functions
  - _Requirements: 5.2, 5.3, 5.5, 6.6_

- [x] 5. Create namespace form section components
  - [x] 5.1 Create BasicInfoSection component
    - Implement src/components/namespace/BasicInfoSection.tsx
    - Add fields for Application Name, Namespace Name, and Namespace Description
    - Implement controlled input handling with onChange callbacks
    - Add proper labels and styling with Tailwind CSS
    - Support light and dark theme modes
    - _Requirements: 3.1, 3.2, 3.3, 7.1, 7.2, 7.3, 7.4, 7.5_

  - [x] 5.2 Create KubernetesQuotasSection component
    - Implement src/components/namespace/KubernetesQuotasSection.tsx
    - Add fields for services, pods, requestsCpu, requestsMemory, limitsMemory, requestsEphemeralStorage, persistentVolumeClaims
    - Use appropriate input types (number for counts, text for resource strings)
    - Group fields logically within the section
    - _Requirements: 3.4, 5.3, 7.1, 7.2, 7.3, 7.4, 7.5_

  - [x] 5.3 Create ArchitectureReviewsSection component
    - Implement src/components/namespace/ArchitectureReviewsSection.tsx
    - Add Yes/No radio buttons for SolutionArch, TechArch, and SecurityArch reviews
    - Implement conditional explanation text fields that appear when "No" is selected
    - Add validation to require explanation when review is marked as "No"
    - Style radio buttons and conditional fields appropriately
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 5.5_

  - [x] 5.4 Create AccessEndpointsSection component
    - Implement src/components/namespace/AccessEndpointsSection.tsx
    - Add fields for Namespace Access AD Group, AWS IAM Role, and Egress Endpoints List
    - Use textarea for Egress Endpoints List to support multiple entries
    - Apply consistent styling with other sections
    - _Requirements: 3.5, 3.6, 3.7, 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 6. Implement NamespaceSelector component
  - Create src/components/namespace/NamespaceSelector.tsx
  - Implement dropdown select element with namespace options
  - Add onChange handler to notify parent of selection
  - Support disabled state during loading
  - Style dropdown consistent with app theme
  - Add proper label and accessibility attributes
  - _Requirements: 2.1, 2.3, 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 7. Implement NamespaceForm component
  - Create src/components/namespace/NamespaceForm.tsx
  - Set up form state management with useState for formData and validationErrors
  - Integrate all section components (BasicInfo, KubernetesQuotas, ArchitectureReviews, AccessEndpoints)
  - Implement controlled form handling with onChange callbacks that properly update nested fields
  - Add form validation on submit using validateNamespaceConfig utility
  - Implement submit handler that validates and generates JSON
  - Display validation errors inline by passing errors prop to section components
  - Add submit button with proper styling and disabled state during submission
  - Show success feedback after submission with generated JSON output
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 5.1, 5.2, 5.3, 5.4, 5.5, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 8. Implement NamespacePage component
  - Create src/pages/NamespacePage.tsx
  - Implement data loading from public/data/namespaces.json on component mount using fetch
  - Add state management for namespaces list, selected namespace, loading, and error states
  - Integrate NamespaceSelector component with selection handler
  - Integrate NamespaceForm component with submit handler
  - Implement JSON generation and display/logging on form submission
  - Add loading state UI while fetching data
  - Add error state UI with retry mechanism if data fails to load
  - Handle namespace selection change to update form data
  - _Requirements: 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 6.1, 6.2, 6.3, 6.4, 6.5, 7.1, 7.2, 7.3_

- [x] 9. Add namespace route to application
  - Update src/App.tsx to import NamespacePage and ProtectedRoute
  - Add /namespace route wrapped with ProtectedRoute component
  - Ensure route is properly integrated with existing Router setup
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 10. Add navigation link to Navbar
  - Update src/components/Navbar.tsx to include link to /namespace page
  - Add link next to Home link in the left section
  - Conditionally show link only when user is authenticated
  - Style link consistent with existing Home link
  - _Requirements: 1.3, 7.1, 7.2, 7.3_

- [x] 11. Add default namespace configuration utility
  - Create utility function to generate default NamespaceConfig values
  - Implement unique ID generation using timestamp format (ns-{timestamp})
  - Set reasonable default values for Kubernetes quotas
  - Set architecture reviews to false with empty explanations by default
  - Add function to src/utils/namespaceValidation.ts or create new utility file
  - _Requirements: 7.3, 7.6, 7.7_

- [x] 12. Enhance NamespaceSelector component for create mode
  - [x] 12.1 Add "Create New Namespace" button to NamespaceSelector
    - Add button below or next to the dropdown
    - Style button as secondary action (not primary like submit)
    - Add onClick handler prop (onCreateNew)
    - _Requirements: 7.1, 7.4_
  
  - [x] 12.2 Add visual indication for create mode
    - Add isCreatingNew prop to component
    - Show visual feedback when in create mode (e.g., different text or styling)
    - Update component to handle both select and create modes
    - _Requirements: 7.4_

- [x] 13. Update NamespacePage to support create mode
  - [x] 13.1 Add create mode state management
    - Add isCreatingNew state to NamespacePage
    - Implement handleCreateNew function to switch to create mode
    - Clear selected namespace when entering create mode
    - _Requirements: 7.1, 7.4_
  
  - [x] 13.2 Generate default namespace for create mode
    - When isCreatingNew is true, generate new namespace with default values
    - Pass generated namespace to NamespaceForm
    - Ensure unique ID is generated for each new namespace
    - _Requirements: 7.3, 7.5, 7.6, 7.7_
  
  - [x] 13.3 Update form submission handling
    - Handle submission differently for create vs edit mode
    - Log appropriate message indicating new namespace creation
    - Allow switching back to select mode after submission
    - _Requirements: 7.5_

- [x] 14. Update NamespaceForm to support create mode
  - Add isCreatingNew prop to NamespaceForm component
  - Update form title or messaging to indicate create vs edit mode
  - Ensure form properly initializes with default values for new namespaces
  - Update submit button text based on mode ("Create Namespace" vs "Submit Configuration")
  - _Requirements: 7.1, 7.5_
