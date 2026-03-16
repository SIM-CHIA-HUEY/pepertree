# Angular 13 to Angular 21 Migration Guide for PeperTree Project

## Overview
This guide provides step-by-step instructions to migrate the PeperTree e-commerce project from Angular 13 to Angular 21.

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