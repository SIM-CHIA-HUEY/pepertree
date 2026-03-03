# Angular 13 to Angular 21 Migration Guide for PeperTree Project

## Overview
This guide provides step-by-step instructions to migrate the PeperTree e-commerce project from Angular 13 to Angular 21.

## Prerequisites
- Current Angular version: 13.2.0
- Current Node.js version: Check with `node -v`
- Current npm version: Check with `npm -v`

## Migration Steps

### Phase 1: Preparation

#### 1. Update Node.js and npm
```bash
# Install Node.js 18.13.0 or newer
nvm install 18.13.0
nvm use 18.13.0

# Update npm to version 10.0.0 or newer
npm install -g npm@10.0.0
```

#### 2. Backup and create migration branch
```bash
git checkout -b angular-21-migration
git push origin angular-21-migration
```

### Phase 2: Incremental Angular Updates

#### 3. Angular 13 → 14
```bash
ng update @angular/core@14 @angular/cli@14
npm install
ng serve  # Test the application
```

#### 4. Angular 14 → 15
```bash
ng update @angular/core@15 @angular/cli@15
npm install
ng serve  # Test the application
```

#### 5. Angular 15 → 16
```bash
ng update @angular/core@16 @angular/cli@16
npm install
ng serve  # Test the application
```

#### 6. Angular 16 → 17 (Major changes)
```bash
ng update @angular/core@17 @angular/cli@17
npm install
ng serve  # Test the application
```

#### 7. Angular 17 → 18
```bash
ng update @angular/core@18 @angular/cli@18
npm install
ng serve  # Test the application
```

#### 8. Angular 18 → 19
```bash
ng update @angular/core@19 @angular/cli@19
npm install
ng serve  # Test the application
```

#### 9. Angular 19 → 20
```bash
ng update @angular/core@20 @angular/cli@20
npm install
ng serve  # Test the application
```

#### 10. Angular 20 → 21
```bash
ng update @angular/core@21 @angular/cli@21
npm install
ng serve  # Test the application
```

### Phase 3: Required Dependency Updates

#### 11. Update TypeScript (required for Angular 17+)
```bash
npm install typescript@5.2
```

#### 12. Update zone.js (required for Angular 17+)
```bash
npm install zone.js@0.14
```

### Phase 4: Testing and Validation

#### 13. Test after each update
```bash
# Run development server
ng serve

# Run tests
ng test

# Build for production
ng build --configuration production
```

### Phase 5: Optional Modernizations

#### 14. Migrate to standalone components (recommended)
```bash
ng generate @angular/core:standalone
```

#### 15. Update to new control flow syntax (optional)
```bash
ng generate @angular/core:control-flow
```

### Phase 6: Final Steps

#### 16. Fix deprecation warnings
Review and address any deprecation warnings shown during the build process.

#### 17. Optimize build
```bash
ng build --stats-json
```

## Troubleshooting

### Common Issues
1. **Dependency conflicts**: Run `npm install` after each update
2. **TypeScript errors**: Ensure TypeScript version is compatible
3. **Build failures**: Check for deprecated APIs and update code accordingly

### Rollback
If issues occur, you can rollback to the previous version:
```bash
git checkout main
```

## Post-Migration Checklist
- [ ] All pages load without errors
- [ ] Forms submit correctly
- [ ] API calls work as expected
- [ ] Responsive design is intact
- [ ] Build completes without warnings
- [ ] Production bundle size is reasonable

## Resources
- [Angular Update Guide](https://angular.dev/update-guide)
- [Angular Migration Documentation](https://angular.dev/reference/migrations)
- [Angular CLI Reference](https://angular.dev/cli)

## Notes
- This migration should be done incrementally, testing at each major version
- The project is relatively small, so the migration should be straightforward
- If you encounter issues, consult the official Angular documentation or community resources